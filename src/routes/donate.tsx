import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Heart, Shield, Sparkles, Copy, Check,
  Smartphone, Landmark, CreditCard, Globe, ArrowRight, TreePine, Users, GraduationCap,
} from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate | Team Bangladesh" },
      { name: "description", content: "Support Team Bangladesh through mobile banking, bank transfer or card. Every contribution plants change." },
      { property: "og:title", content: "Donate to Team Bangladesh" },
      { property: "og:description", content: "Fuel a greener, kinder Bangladesh — donate via bKash, Nagad, Rocket or bank transfer." },
    ],
  }),
  component: Donate,
});

const AMOUNTS = [500, 1000, 2500, 5000, 10000];

const MOBILE = [
  { name: "bKash", number: "+880 1911-480021", type: "Personal", color: "from-pink-500 to-rose-600", initial: "bK" },
  { name: "Nagad", number: "+880 1911-480021", type: "Personal", color: "from-orange-500 to-amber-600", initial: "Ng" },
  { name: "Rocket", number: "+880 1911-480021", type: "Personal", color: "from-fuchsia-600 to-purple-700", initial: "Rk" },
  { name: "Upay", number: "+880 1911-480021", type: "Personal", color: "from-emerald-500 to-teal-600", initial: "Up" },
];

const BANKS = [
  { name: "Dutch-Bangla Bank Ltd.", account: "101.123.456789", branch: "Gulshan Branch, Dhaka", routing: "090260423", swift: "DBBLBDDH" },
  { name: "BRAC Bank Ltd.", account: "1501-200456789-001", branch: "Banani Branch, Dhaka", routing: "060264563", swift: "BRAKBDDH" },
  { name: "Islami Bank Bangladesh", account: "2050-3540100012345", branch: "Mohakhali Branch, Dhaka", routing: "125270439", swift: "IBBLBDDH" },
];

const IMPACT = [
  { icon: TreePine, val: "৳500", text: "Plants 25 native saplings in a school yard." },
  { icon: GraduationCap, val: "৳2,500", text: "Funds eco-literacy kits for an entire classroom." },
  { icon: Users, val: "৳10,000", text: "Powers a thana-level cleanup drive end-to-end." },
];

function CopyChip({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-xs text-white/90 transition"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-leaf-glow" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Donate() {
  const [amount, setAmount] = useState<number>(2500);
  const [custom, setCustom] = useState("");
  const [tab, setTab] = useState<"mobile" | "bank" | "card">("mobile");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Stand with us"
        title="Donate to plant change."
        subtitle="Your contribution powers tree drives, clean-up campaigns, eco-literacy, and grassroots leadership across all 64 districts."
        image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80"
        stats={[
          { label: "Saplings planted", value: "120K+" },
          { label: "Drives funded", value: "480" },
          { label: "Districts", value: "64" },
          { label: "Volunteers", value: "12K+" },
        ]}
      />

      {/* Trust strip */}
      <section className="border-y border-border bg-card/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {[
            { I: Shield, t: "100% transparent ledger" },
            { I: Heart, t: "Tax-deductible receipts" },
            { I: Sparkles, t: "Every taka tracked" },
            { I: Globe, t: "Secure global payments" },
          ].map(({ I, t }) => (
            <div key={t} className="flex items-center gap-2 text-muted-foreground"><I className="h-4 w-4 text-leaf" /> {t}</div>
          ))}
        </div>
      </section>

      {/* Amount + Methods */}
      <section className="mx-auto max-w-7xl px-5 py-20 flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Amount picker */}
        <Reveal className="order-2 lg:order-1 lg:col-span-4">
          <div className="sticky top-28 self-start rounded-3xl border border-border bg-card p-7 shadow-xl">
            <div className="script text-ember text-lg">Choose your gift</div>
            <h3 className="text-2xl font-bold mt-1">How much will you give?</h3>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMOUNTS.map((a) => (
                <motion.button
                  key={a}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setAmount(a); setCustom(""); }}
                  className={`rounded-full py-2.5 px-2 flex items-center justify-center text-[15px] sm:text-base font-bold border transition-all ${amount === a && !custom
                      ? "bg-leaf-deep text-white border-leaf shadow-lg shadow-leaf/30"
                      : "bg-background border-border text-foreground hover:border-leaf hover:bg-leaf/5"
                    }`}
                >
                  <span className="text-[11px] sm:text-xs text-muted-foreground mr-0.5">৳</span>{a.toLocaleString()}
                </motion.button>
              ))}
              <div className="col-span-2 sm:col-span-3 mt-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">৳</span>
                <input
                  type="number"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Custom amount"
                  className="w-full rounded-2xl border border-border bg-background pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-leaf/5 border border-leaf/15 p-4 text-sm">
              <div className="text-xs uppercase tracking-wider text-leaf font-semibold">Your impact</div>
              <p className="mt-1 text-foreground/80">
                <strong>৳{(custom ? Number(custom) : amount).toLocaleString()}</strong> can fuel{" "}
                {(() => {
                  const v = custom ? Number(custom) : amount;
                  if (v >= 10000) return "a full thana-level cleanup drive.";
                  if (v >= 2500) return "eco-literacy kits for a classroom.";
                  if (v >= 500) return Math.floor(v / 20) + " native saplings.";
                  return "outreach materials for our volunteers.";
                })()}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("This feature is not available yet")}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ember text-white font-bold uppercase tracking-wider py-4 shadow-lg shadow-ember/30 hover:shadow-ember/50"
            >
              Donate ৳{(custom ? Number(custom) : amount).toLocaleString()} <ArrowRight className="h-4 w-4" />
            </motion.button>
            <p className="text-xs text-muted-foreground text-center mt-3">Secure checkout · cancel anytime</p>
          </div>
        </Reveal>

        {/* Methods */}
        <div className="order-1 lg:order-2 lg:col-span-8">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-6">
              {([
                { k: "mobile", l: "Mobile Banking", I: Smartphone },
                { k: "bank", l: "Bank Transfer", I: Landmark },
                { k: "card", l: "Card / Online", I: CreditCard },
              ] as const).map(({ k, l, I }) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${tab === k ? "bg-foreground text-background" : "bg-card border border-border text-foreground hover:border-leaf"
                    }`}
                >
                  <I className="h-4 w-4" /> {l}
                </button>
              ))}
            </div>
          </Reveal>

          {tab === "mobile" && (
            <div className="grid sm:grid-cols-2 gap-5">
              {MOBILE.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.06}>
                  <motion.div whileHover={{ y: -4 }} className={`relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-br ${m.color} shadow-xl`}>
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center font-extrabold">{m.initial}</div>
                      <span className="text-xs uppercase tracking-wider bg-white/15 rounded-full px-3 py-1">{m.type}</span>
                    </div>
                    <h4 className="mt-5 text-2xl font-bold">{m.name}</h4>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-lg font-mono tracking-wide">{m.number}</span>
                      <CopyChip value={m.number.replace(/\D/g, "")} />
                    </div>
                    <p className="mt-3 text-xs text-white/80">Send Money → use reference “TeamBD”.</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          )}

          {tab === "bank" && (
            <div className="space-y-5">
              {BANKS.map((b, i) => (
                <Reveal key={b.name} delay={i * 0.06}>
                  <motion.div whileHover={{ y: -3 }} className="rounded-3xl border border-border bg-card p-6 hover:border-leaf transition-colors">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-leaf font-semibold">Bank Transfer</div>
                        <h4 className="text-xl font-bold mt-1">{b.name}</h4>
                        <p className="text-sm text-muted-foreground">{b.branch}</p>
                      </div>
                      <div className="h-12 w-12 rounded-2xl gradient-leaf text-white flex items-center justify-center"><Landmark className="h-5 w-5" /></div>
                    </div>
                    <div className="mt-5 grid sm:grid-cols-3 gap-3">
                      {[
                        { k: "Account", v: b.account },
                        { k: "Routing", v: b.routing },
                        { k: "SWIFT", v: b.swift },
                      ].map((r) => (
                        <div key={r.k} className="rounded-2xl bg-muted/50 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.k}</div>
                          <div className="mt-1 flex items-center justify-between gap-2">
                            <span className="font-mono text-sm truncate">{r.v}</span>
                            <button
                              onClick={() => navigator.clipboard.writeText(r.v)}
                              className="rounded-full p-1.5 hover:bg-leaf/10 text-leaf"
                              aria-label={`Copy ${r.k}`}
                            ><Copy className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      Account name: <strong className="text-foreground">Team Bangladesh Foundation</strong>. Please email the receipt to contact.teambangladesh@gmail.com for acknowledgement.
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          )}

          {tab === "card" && (
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-8 text-center">
                <div className="mx-auto h-14 w-14 rounded-2xl gradient-warm text-ink flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h4 className="text-2xl font-bold">Card & International Payments</h4>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  Visa, Mastercard, Amex and international wires accepted via our secure processor.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  onClick={() => alert("This feature is not available yet")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3 font-bold uppercase tracking-wider text-sm"
                >
                  Continue to secure checkout <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Impact */}
      <section className="bg-background text-foreground py-24 relative overflow-hidden">
        <div className="absolute -top-20 left-10 h-80 w-80 rounded-full bg-leaf/10 blur-3xl" />
        <div className="absolute -bottom-20 right-10 h-80 w-80 rounded-full bg-amber-glow/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-leaf/10 border border-leaf/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-leaf-deep">
                Where it goes
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4">Real numbers. Real outcomes.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {IMPACT.map(({ icon: I, val, text }, i) => (
              <Reveal key={val} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-sm p-7 h-full">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-leaf-glow to-leaf flex items-center justify-center"><I className="h-5 w-5 text-white" /></div>
                  <div className="mt-5 text-3xl font-extrabold text-leaf-deep">{val}</div>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
