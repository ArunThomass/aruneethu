from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(r"C:\Users\arunt\Documents\Codex\2026-09-03\i-need-to-create-a-professional-2")
SOURCE = Path(r"C:\Users\arunt\Downloads\whatsapp")
DEST = ROOT / "outputs" / "wedding-invitation" / "assets" / "images"
DEST.mkdir(parents=True, exist_ok=True)

PHOTOS = {
    "hero": SOURCE / "ETK03845.JPG.jpg.jpeg",
    "umbrella": SOURCE / "ETK02969.JPG.jpg.jpeg",
    "embrace": SOURCE / "ETK02698.JPG.jpg.jpeg",
    "walk": SOURCE / "ETK02664.JPG.jpg.jpeg",
}


def resized_photo(source, destination, size):
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail(size, Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=83, method=6)


for label, path in PHOTOS.items():
    resized_photo(path, DEST / f"{label}.webp", (1440, 2160))


def choose_font(size, italic=False):
    candidates = [
        r"C:\Windows\Fonts\georgiai.ttf" if italic else r"C:\Windows\Fonts\georgia.ttf",
        r"C:\Windows\Fonts\GARA.TTF",
        r"C:\Windows\Fonts\segoeui.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


with Image.open(PHOTOS["hero"]) as source:
    photo = ImageOps.exif_transpose(source).convert("RGB")
    backdrop = ImageOps.fit(photo, (1200, 630), Image.Resampling.LANCZOS, centering=(0.58, 0.42))
    backdrop = backdrop.filter(ImageFilter.GaussianBlur(10))
    backdrop = ImageEnhance.Brightness(backdrop).enhance(0.52)
    card = backdrop.copy()
    feature = ImageOps.fit(photo, (450, 550), Image.Resampling.LANCZOS, centering=(0.59, 0.43))
    card.paste(feature, (690, 40))

draw = ImageDraw.Draw(card, "RGBA")
draw.rectangle((0, 0, 1200, 630), fill=(18, 31, 25, 72))
draw.rectangle((52, 52, 1148, 578), outline=(217, 181, 100, 210), width=2)
draw.line((90, 170, 525, 170), fill=(217, 181, 100, 200), width=2)
small = choose_font(24)
names = choose_font(58, italic=True)
date = choose_font(30)
draw.text((90, 120), "THE WEDDING OF", font=small, fill=(247, 241, 224, 230))
draw.multiline_text((90, 205), "Arun Thomas\n& Neethu Babu", font=names, fill=(255, 247, 229, 255), spacing=6)
draw.text((90, 405), "13 SEPTEMBER 2026  •  12:30 PM", font=date, fill=(232, 202, 132, 255))
draw.text((90, 455), "St. Thomas Church, Villadam", font=small, fill=(247, 241, 224, 230))
card.save(DEST / "og-wedding-invitation.jpg", "JPEG", quality=88, optimize=True)
