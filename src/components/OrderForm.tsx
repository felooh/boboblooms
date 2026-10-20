"use client";

import { useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Ruracio / traditional ceremony",
  "Valentine's",
  "Graduation",
  "Get well soon",
  "Sympathy / funeral",
  "Corporate event",
  "Just because",
  "Other",
];

type Collection = { slug: string; title: string };

const field =
  "mt-1.5 w-full rounded-xl border border-gold/40 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:border-rose focus:ring-2 focus:ring-rose/20 focus:outline-none";
const label = "block text-sm font-bold text-ink";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function OrderForm({
  collections,
  initialCollection = "",
}: {
  collections: Collection[];
  initialCollection?: string;
}) {
  const [delivery, setDelivery] = useState(true);
  const [today] = useState(() =>
    new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(new Date()),
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    // A line that only appears when its field was filled in
    const optional = (key: string, line: string) => (get(key) ? line : null);
    const collection = collections.find((c) => c.slug === get("collection"))?.title ?? "Not sure yet, please advise";
    const recipientPhone = get("recipientPhone") ? `, ${get("recipientPhone")}` : "";

    const lines = [
      "Hello Bobo Blooms 👋",
      "I'd like to place an order.",
      "",
      `*Occasion:* ${get("occasion")}`,
      `*Flowers:* ${collection}`,
      `*Date needed:* ${formatDate(get("date"))}`,
      delivery ? `*Delivery to:* ${get("location")}` : `*Collection:* from your shop at ${site.location}`,
      optional("recipient", `*Recipient:* ${get("recipient")}${recipientPhone}`),
      optional("card", `*Card message:* "${get("card")}"`),
      optional("budget", `*Budget:* KES ${get("budget")}`),
      optional("details", `*Details:* ${get("details")}`),
      "",
      `My name: ${get("name")}`,
    ].filter((line) => line !== null);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="occasion" className={label}>
            Occasion *
          </label>
          <select id="occasion" name="occasion" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose an occasion
            </option>
            {OCCASIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="collection" className={label}>
            What would you like?
          </label>
          <select id="collection" name="collection" defaultValue={initialCollection} className={field}>
            <option value="">Not sure yet, please advise</option>
            {collections.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={label}>
            Date needed *
          </label>
          <input id="date" name="date" type="date" required min={today} className={field} />
        </div>
        <div>
          <label htmlFor="budget" className={label}>
            Budget (KES)
          </label>
          <input
            id="budget"
            name="budget"
            inputMode="numeric"
            placeholder={`From ${site.priceFrom.replace("KES ", "")}`}
            className={field}
          />
        </div>
      </div>

      <fieldset>
        <legend className={label}>Delivery or collection? *</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-3">
          {[
            { value: true, title: "Deliver", text: "Anywhere in Kenya" },
            { value: false, title: "Collect", text: site.location },
          ].map((opt) => (
            <label
              key={opt.title}
              className={`cursor-pointer rounded-xl border px-4 py-3 transition-colors ${
                delivery === opt.value ? "border-rose bg-rose/5 ring-2 ring-rose/20" : "border-gold/40 bg-white"
              }`}
            >
              <input
                type="radio"
                name="fulfilment"
                className="sr-only"
                checked={delivery === opt.value}
                onChange={() => setDelivery(opt.value)}
              />
              <span className="block font-bold">{opt.title}</span>
              <span className="block text-sm text-ink-soft">{opt.text}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {delivery && (
        <div>
          <label htmlFor="location" className={label}>
            Delivery location *
          </label>
          <input
            id="location"
            name="location"
            required
            placeholder="Area and town, e.g. Westlands, Nairobi"
            className={field}
          />
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="recipient" className={label}>
            Recipient&apos;s name
          </label>
          <input id="recipient" name="recipient" placeholder="Who are the flowers for?" className={field} />
        </div>
        <div>
          <label htmlFor="recipientPhone" className={label}>
            Recipient&apos;s phone
          </label>
          <input
            id="recipientPhone"
            name="recipientPhone"
            type="tel"
            placeholder="For the delivery rider"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="card" className={label}>
          Message for the card
        </label>
        <textarea id="card" name="card" rows={2} placeholder="Happy birthday, Mum! Love, Wanjiru" className={field} />
      </div>

      <div>
        <label htmlFor="details" className={label}>
          Anything else?
        </label>
        <textarea
          id="details"
          name="details"
          rows={3}
          placeholder="Colours, favourite flowers, venue, number of tables… You can send photos once the chat opens."
          className={field}
        />
      </div>

      <div>
        <label htmlFor="name" className={label}>
          Your name *
        </label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-lg font-bold text-white shadow-lg shadow-whatsapp/25 transition-opacity hover:opacity-90 sm:w-auto"
        >
          <WhatsAppIcon />
          Send order on WhatsApp
        </button>
        <p className="mt-3 text-sm text-ink-soft">
          This opens WhatsApp with your order filled in. Nothing is saved on this website. We&apos;ll reply to confirm
          the details and price.
        </p>
      </div>
    </form>
  );
}
