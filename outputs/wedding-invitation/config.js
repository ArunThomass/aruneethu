/*
  EDIT THIS FILE to personalise the invitation.
  All wedding-specific content, links, assets, and colours live here.
*/
window.WEDDING_CONFIG = Object.freeze({
  siteUrl: "https://arun-and-neethu.example/", // Replace before deployment.
  siteTitle: "Arun Thomas & Neethu Babu | Wedding Invitation",
  siteDescription: "Join us as Arun Thomas and Neethu Babu begin their forever on 13 September 2026.",
  ogImage: "assets/images/og-wedding-invitation.jpg",

  couple: {
    partnerA: "Arun Thomas",
    partnerB: "Neethu Babu",
    displayName: "Arun Thomas & Neethu Babu",
  },

  wedding: {
    dateISO: "2026-09-13",
    eventStart: "2026-09-13T12:05:00+05:05",
    dateDisplay: "Sunday, 13 September 2026",
    dateShort: "13 September 2026",
    time: "12:05 PM",
    timezone: "Asia/Kolkata",
  },

  venues: {
    ceremony: {
      label: "Wedding Ceremony",
      name: "St. Thomas Church, Villadam",
      mapUrl: "https://maps.app.goo.gl/wVDTxaJ7TwXPmTo88?g_st=aw",
    },
    reception: {
      label: "Reception",
      name: "St. Francis Xavier's Parish Hall, Cheroor",
      mapUrl: "https://maps.app.goo.gl/mi3HsZSpiapKWmLp8",
    },
  },

  assets: {
    music: "assets/love-story-fur-elise.mp3",
    hero: "assets/images/hero.webp",
    gallery: [
      {
        src: "assets/images/hero.webp",
        alt: "Arun and Neethu together by the sea with a bouquet of purple flowers",
        position: "58% 44%",
      },
      {
        src: "assets/images/umbrella.webp",
        alt: "Arun and Neethu walking hand in hand under an umbrella by the beach",
        position: "52% 45%",
      },
      {
        src: "assets/images/embrace.webp",
        alt: "Arun and Neethu sharing a quiet moment in a green grove",
        position: "52% 46%",
      },
      {
        src: "assets/images/walk.webp",
        alt: "Arun and Neethu holding hands beneath tall trees",
        position: "52% 48%",
      },
    ],
  },

  copy: {
    coverEyebrow: "The Wedding Invitation",
    coverButton: "Tap to open",
    coverHint: "A little moment, made with love",
    introKicker: "Together with our families",
    introLead: "We invite you to share in the joy of our new beginning.",
    introMessage: "Some stories are written quietly, then all at once become a beautiful forever. With hearts full of love and gratitude, we would be honoured by your presence as we begin ours.",
    scrollLabel: "Scroll to discover",
    revealKicker: "Save the date",
    scratchPrompt: "Gently scratch to reveal our day",
    revealButton: "Reveal our day",
    countdownKicker: "Counting down to forever",
    countdownEnded: "Today is the day — we cannot wait to celebrate with you.",
    daysLabel: "Days",
    hoursLabel: "Hours",
    minutesLabel: "Minutes",
    secondsLabel: "Seconds",
    storyKicker: "A little of our story",
    storyTitle: "A love worth celebrating",
    storyMessage: "From simple moments to a promise for a lifetime, every step has led us here. We cannot wait to make this memory with the people who mean the most to us.",
    galleryKicker: "Our moments",
    galleryTitle: "Made of soft skies and shared smiles",
    detailsKicker: "Celebrate with us",
    locationButton: "View location",
    closingKicker: "With love",
    closingTitle: "We look forward to celebrating with you",
    closingMessage: "Your blessings and presence will make our day complete.",
    musicOnLabel: "Pause music",
    musicOffLabel: "Play music",
  },

  theme: {
    ink: "#25372a",
    ivory: "#f8f4ea",
    champagne: "#e7dcc4",
    gold: "#c7a45b",
    lavender: "#8e7aa8",
    moss: "#5f7664",
  },
});
