export const site = {
  name: "Bobo Blooms",
  tagline: "Premier flower business",
  url: "https://boboblooms.org",
  phoneDisplay: "0722 402 407",
  phoneIntl: "254722402407",
  location: "City Market, Nairobi",
};

export function whatsappLink(message = "Hello Bobo Blooms 👋\nI am interested in your flower services. Thank you!") {
  return `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(message)}`;
}
