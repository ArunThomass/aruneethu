/*
  Run after editing config.js and before deploying:
  node scripts/update-social-meta.mjs

  This keeps crawler-visible title, description, canonical and Open Graph tags
  in index.html aligned with the single editable wedding configuration.
*/
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteDirectory = path.resolve(scriptDirectory, "..");
const configPath = path.join(siteDirectory, "config.js");
const indexPath = path.join(siteDirectory, "index.html");

const configSource = await readFile(configPath, "utf8");
const sandbox = { window: {}, Object };
vm.createContext(sandbox);
vm.runInContext(configSource, sandbox, { filename: "config.js" });
const config = sandbox.window.WEDDING_CONFIG;

if (!config?.siteUrl || !config?.ogImage) throw new Error("config.js is missing siteUrl or ogImage.");

const htmlEscape = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("\"", "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const imageUrl = new URL(config.ogImage, config.siteUrl).href;
const replacements = [
  [/<title>.*?<\/title>/s, `<title>${htmlEscape(config.siteTitle)}</title>`],
  [/(<meta name="description" content=")[^"]*(" \/>)/, `$1${htmlEscape(config.siteDescription)}$2`],
  [/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${htmlEscape(config.siteTitle)}$2`],
  [/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${htmlEscape(config.siteDescription)}$2`],
  [/(<meta property="og:image" content=")[^"]*(" \/>)/, `$1${htmlEscape(imageUrl)}$2`],
  [/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${htmlEscape(config.siteUrl)}$2`],
  [/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${htmlEscape(config.siteTitle)}$2`],
  [/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${htmlEscape(config.siteDescription)}$2`],
  [/(<meta name="twitter:image" content=")[^"]*(" \/>)/, `$1${htmlEscape(imageUrl)}$2`],
  [/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${htmlEscape(config.siteUrl)}$2`],
];

let index = await readFile(indexPath, "utf8");
replacements.forEach(([pattern, replacement]) => { index = index.replace(pattern, replacement); });
await writeFile(indexPath, index);
console.log("Social metadata updated from config.js.");
