export const site = {
  name: "Bobo Blooms",
  tagline: "Premier flower business",
  url: "https://boboblooms.org",
  phoneDisplay: "0722 402 407",
  phoneIntl: "254722402407",
  location: "City Market, Nairobi",
  instagram: "https://www.instagram.com/bobo__blooms/",
  instagramHandle: "@bobo__blooms",
  hours: { days: "Monday to Saturday", short: "Mon–Sat, 7am–7pm", opens: "07:00", closes: "19:00" },
  priceFrom: "KES 1,000",
  delivery: "We deliver anywhere in Kenya",
};

export function whatsappLink(message = "Hello Bobo Blooms 👋\nI am interested in your flower services. Thank you!") {
  return `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(message)}`;
}

export const faqs = [
  {
    q: "How much do your flowers cost?",
    a: `Our arrangements start from ${site.priceFrom}. The final price depends on the flowers, size and design you choose. Larger pieces like pedestals, arches and full event decor are quoted on request. Send us a photo on WhatsApp and we'll give you a price.`,
  },
  {
    q: "Do you deliver?",
    a: `Yes. We deliver anywhere in Kenya. Tell us your location and date on WhatsApp and we'll confirm the delivery details. You can also collect from our shop at ${site.location}.`,
  },
  {
    q: "What are your opening hours?",
    a: `We're open ${site.hours.days}, 7am to 7pm, at ${site.location}. You can message us on WhatsApp at any time.`,
  },
  {
    q: "How do I place an order?",
    a: `Message us on WhatsApp or SMS at ${site.phoneDisplay}, or call. Send a photo from our gallery or describe what you want, and we'll confirm the details and price.`,
  },
  {
    q: "Can you match my colours or theme?",
    a: "Yes. Every arrangement is made to order, so we can design around your colours, flowers, occasion and budget.",
  },
];
