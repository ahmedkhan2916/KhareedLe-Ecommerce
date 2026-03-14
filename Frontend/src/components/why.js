import React from "react";
import {
  BadgeCheck,
  Clock3,
  Gift,
  HandMetal,
  WalletCards,
} from "lucide-react";
import "../assets/Style/Headings.css";

const features = [
  {
    title: "Ultra-Fast 24 Hour Delivery",
    description:
      "Electronic products move fast from our side to your doorstep, so customers spend less time waiting and more time using what they bought.",
    eyebrow: "Speed First",
    stat: "24h",
    icon: Clock3,
  },
  {
    title: "Competitive Pricing That Still Feels Premium",
    description:
      "We keep pricing sharp without making the shopping experience feel cheap, so value and presentation work together.",
    eyebrow: "Better Value",
    stat: "Low Margin",
    icon: WalletCards,
  },
  {
    title: "Exclusive Surprise Gifts",
    description:
      "Orders can include thoughtful extras like cases, tempered glass, headphones, power banks, and neckbands that make the purchase feel rewarding.",
    eyebrow: "Unexpected Extras",
    stat: "Bonus Perks",
    icon: Gift,
  },
  {
    title: "Quality Assurance You Can Trust",
    description:
      "We focus on original, genuine products so the customer isn't gambling on authenticity after checkout.",
    eyebrow: "Verified Quality",
    stat: "100% Genuine",
    icon: BadgeCheck,
  },
  {
    title: "Experience Before You Own",
    description:
      "Customers get a more confident buying journey by understanding the design, comfort, and feel of the device before committing.",
    eyebrow: "Hands-On Buying",
    stat: "Feel It First",
    icon: HandMetal,
  },
];

function Why() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdfa_0%,#fff8ef_42%,#f8fafc_100%)] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-56 w-56 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-orange-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-600 shadow-sm">
            Why Customers Stay
          </p>
          <h2 className="HeadingPlayFair text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Why We Feel Different From the Rest
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            The difference is not one feature. It is the full buying experience:
            faster delivery, better pricing, stronger trust, and more delight
            built into each order.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[26px] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Experience Score
            </p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">5x</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              More thoughtful than a basic catalog layout.
            </p>
          </div>
          <div className="rounded-[26px] border border-orange-200 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_100%)] p-6 shadow-[0_18px_60px_rgba(249,115,22,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600">
              Fast Flow
            </p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">24h</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Delivery-focused service that reduces buying hesitation.
            </p>
          </div>
          <div className="rounded-[26px] border border-cyan-200 bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_100%)] p-6 shadow-[0_18px_60px_rgba(6,182,212,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Trust Layer
            </p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">100%</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Focus on genuine products and more confident purchases.
            </p>
          </div>
          <div className="rounded-[26px] border border-fuchsia-200 bg-[linear-gradient(135deg,#fdf4ff_0%,#ffffff_100%)] p-6 shadow-[0_18px_60px_rgba(192,38,211,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-700">
              Delight Factor
            </p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">Bonus</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Surprise gifts and a premium-feeling purchase journey.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-8 lg:mt-14">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const reverseRow = index % 2 === 1;

            return (
              <article
                key={feature.title}
                className={`grid items-center gap-6 rounded-[32px] border border-white/70 bg-white/80 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6 lg:grid-cols-2 lg:p-7 ${
                  reverseRow ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-[26px]">
                  <div className="relative flex h-[280px] w-full items-center justify-center bg-[linear-gradient(135deg,#e2e8f0_0%,#f8fafc_50%,#dbeafe_100%)] sm:h-[340px] lg:h-[380px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_38%),radial-gradient(circle_at_bottom,rgba(249,115,22,0.12),transparent_32%)]" />
                    <div className="relative flex flex-col items-center gap-4 rounded-[28px] border border-slate-200/80 bg-white/70 px-8 py-10 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                        X Arena
                      </span>
                      <span className="HeadingPlayFair text-4xl text-slate-900 sm:text-5xl">
                        Visual Coming Soon
                      </span>
                      <span className="text-center text-sm leading-7 text-slate-600">
                        Reserved for custom X Arena artwork
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02)_0%,rgba(2,6,23,0.34)_100%)]" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-3 backdrop-blur">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                        {feature.eyebrow}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {feature.stat}
                      </p>
                    </div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
                      <Icon size={22} strokeWidth={2.1} />
                    </span>
                  </div>
                </div>

                <div className="flex h-full flex-col justify-center px-1 sm:px-2 lg:px-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-600">
                    {feature.eyebrow}
                  </p>
                  <h3 className="mt-4 HeadingPlayFair text-3xl leading-tight text-slate-950 sm:text-4xl">
                    {feature.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
                    {feature.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                      Better trust
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                      Better delivery
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                      Better value
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Why;
