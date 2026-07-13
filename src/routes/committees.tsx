import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Shield, Building2, MapPin, Linkedin, Mail, Sparkles, Users, ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import femImg from "@/assets/FEM.png";
import teamPrecident from "@/assets/precident.jpeg";
import teamNazmul from "@/assets/nazmul.png";
import teamLogo from "@/assets/tblogo.png";
import teamAruni from "@/assets/aruni.jpeg";
import teamNahreen from "@/assets/nahreen.jpeg";

export const Route = createFileRoute("/committees")({
  head: () => ({
    meta: [
      { title: "Our Committees | Team Bangladesh" },
      { name: "description", content: "President, advisory, executive, central, district and thana committees of Team Bangladesh." },
      { property: "og:title", content: "Committees | Team Bangladesh" },
      { property: "og:description", content: "The leadership and field network of Team Bangladesh." },
    ],
  }),
  component: Committees,
});

type Person = { n: string; name: string; role: string; bio: string; img: string };

const PRESIDENT: Person = {
  n: "01",
  name: "TBA",
  role: "Member",
  bio: "Leading Team Bangladesh with vision, dedication, and a commitment to a greener, more equitable nation.",
  img: femImg,
};

const CHIEF_ADVISOR: Person = {
  n: "A1",
  name: "Dr. Muhit A Rana",
  role: "Member",
  bio: "Founding visionary and chief advisor, guiding the organization's strategy and nation-wide green development agenda.",
  img: teamPrecident,
};

const ADVISORS: Person[] = [
  { n: "A2", name: "Barrister Rakeen", role: "Member", bio: "Compliance and organizational legal frameworks.", img: teamLogo },
  { n: "A3", name: "Prof. Anisur Rahman", role: "Member", bio: "Long-term strategy, partnerships and policy advocacy.", img: teamLogo },
];

const EXEC: Person[] = [
  { n: "01", name: "Sultana Ahmed, MP", role: "Member", bio: "Heads the organization and chairs the executive committee.", img: teamLogo },
  { n: "02", name: "Salima Talukder Aruni", role: "Member", bio: "Internal logistics and executive strategy planning.", img: teamAruni },
  { n: "03", name: "Nazmul Bari", role: "Member", bio: "Day-to-day operations and inter-committee coordination.", img: teamNazmul },
  { n: "04", name: "Dr. Muhit A Rana", role: "Member", bio: "Founding visionary and strategic guide.", img: teamPrecident },
  { n: "05", name: "Rakin Ahmed Bhuiyan", role: "Member", bio: "Finance, audit and donor accountability.", img: teamLogo },
  { n: "06", name: "Nahreen Asghar", role: "Member", bio: "National outreach and public relations.", img: teamNahreen },
];

const CENTRAL: Person[] = [
  { n: "C1", name: "Tanvir Hasan", role: "Member", bio: "Field operations and event mobilization.", img: teamLogo },
  { n: "C2", name: "Mahfuza Akter", role: "Member", bio: "Champion of women-led campaigns nationwide.", img: teamLogo },
  { n: "C3", name: "Imran Hossain", role: "Member", bio: "Cross-committee coordination and reporting.", img: teamLogo },
];

const DISTRICTS = [
  { name: "Dhaka", head: "Tanvir Ahmed", members: 1240 },
  { name: "Chittagong", head: "Sumaiya Rahman", members: 980 },
  { name: "Khulna", head: "Faisal Karim", members: 720 },
  { name: "Rajshahi", head: "Lubna Ferdous", members: 640 },
  { name: "Sylhet", head: "Noman Shafique", members: 580 },
  { name: "Barishal", head: "Shahed Alam", members: 420 },
  { name: "Rangpur", head: "Mahfuza Akter", members: 530 },
  { name: "Mymensingh", head: "Rifat Hasan", members: 360 },
];

const DUMMY_ADVISORY = Array.from({ length: 28 }).map((_, i) => ({
  n: `A${i + 4}`,
  name: `Advisory Member ${i + 4}`,
  role: "Member",
  bio: "TBA",
  img: teamLogo
}));
const ALL_ADVISORS = [...ADVISORS, ...DUMMY_ADVISORY];

const DUMMY_CENTRAL = Array.from({ length: 47 }).map((_, i) => ({
  n: `C${i + 4}`,
  name: `Central Member ${i + 4}`,
  role: "Member",
  bio: "TBA",
  img: teamLogo
}));
const ALL_CENTRAL = [...CENTRAL, ...DUMMY_CENTRAL];

const ALL_DISTRICTS = Array.from({ length: 64 }).map((_, i) => (
  DISTRICTS[i] || { name: `District ${i + 1}`, head: "TBA", members: Math.floor(Math.random() * 500) + 100 }
));

const THANAS = [
  "Banani", "Gulshan", "Dhanmondi", "Mirpur", "Uttara", "Tejgaon", "Mohammadpur", "Motijheel",
  "Kotwali", "Pahartali", "Khulshi", "Doublemooring", "Bandar", "Halishahar",
];

function PersonCard({ p, big = false }: { p: Person; big?: boolean }) {
  return (
    <motion.div whileHover={{ y: -6 }} className={`group relative rounded-3xl overflow-hidden border border-border bg-card h-full flex flex-col ${big ? "lg:flex-row" : ""}`}>
      <div className={`relative overflow-hidden shrink-0 ${big ? "lg:w-1/2 aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[4/5]"}`}>
        <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-amber-glow text-ink px-3 py-1 text-xs font-bold">#{p.n}</span>
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all">
          <a href="#" className="h-9 w-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-leaf"><Linkedin className="h-4 w-4" /></a>
          <a href="#" className="h-9 w-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-leaf"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
      <div className={`p-6 flex flex-col flex-1 ${big ? "lg:w-1/2 justify-center" : ""}`}>
        <h3 className={`font-bold ${big ? "text-3xl" : "text-lg"}`}>{p.name}</h3>
        <p className="text-leaf font-semibold text-sm mt-1">{p.role}</p>
        <p className={`text-muted-foreground mt-3 flex-1 ${big ? "" : "text-sm"}`}>{p.bio}</p>
      </div>
    </motion.div>
  );
}

function SectionHeader({ icon: Icon, eyebrow, title, tone = "leaf" }: { icon: any; eyebrow: string; title: string; tone?: "leaf" | "amber" }) {
  const cls = tone === "amber" ? "bg-amber-glow/15 text-amber-glow" : "bg-leaf/15 text-leaf";
  return (
    <Reveal>
      <div className="text-center mb-12">
        <div className={`inline-flex items-center gap-2 rounded-full ${cls} px-4 py-1.5 text-xs font-semibold uppercase tracking-wider`}>
          <Icon className="h-4 w-4" /> {eyebrow}
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mt-4">{title}</h2>
      </div>
    </Reveal>
  );
}

function CollapsibleSection({
  icon: Icon,
  eyebrow,
  title,
  tone = "leaf",
  bgClass = "py-12 md:py-16",
  children
}: {
  icon: any;
  eyebrow: string;
  title: string;
  tone?: "leaf" | "amber";
  bgClass?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const cls = tone === "amber" ? "bg-amber-glow/15 text-amber-glow" : "bg-leaf/15 text-leaf";

  return (
    <section className={`${bgClass} transition-colors duration-500 relative overflow-hidden`}>
      {bgClass?.includes('bg-ink') && (
        <>
          <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/20 blur-3xl pointer-events-none animate-float-slow" />
          <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-glow/15 blur-3xl pointer-events-none animate-float-slow" />
        </>
      )}
      <div className="mx-auto max-w-7xl px-5 relative z-10">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left group flex items-center justify-between relative z-20"
        >
          <div>
            <div className={`inline-flex items-center gap-2 rounded-full ${cls} px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4`}>
              <Icon className="h-4 w-4" /> {eyebrow}
            </div>
            <h2 className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${bgClass?.includes('bg-ink') ? 'text-white' : 'group-hover:text-leaf'}`}>
              {title}
            </h2>
          </div>
          <div className={`h-12 w-12 shrink-0 rounded-full border flex items-center justify-center transition-colors duration-300 ${open ? 'bg-leaf text-white border-leaf' : bgClass?.includes('bg-ink') ? 'border-white/20 bg-white/5 text-white group-hover:bg-leaf/20' : 'border-border bg-card group-hover:bg-leaf/10'}`}>
            <ChevronDown className={`h-6 w-6 transition-transform duration-500 ${open ? 'rotate-180' : ''}`} />
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-12">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Committees() {
  const [showAllAdvisors, setShowAllAdvisors] = useState(false);
  const [showAllCentral, setShowAllCentral] = useState(false);
  const [showAllDistricts, setShowAllDistricts] = useState(false);
  const [showAllThanas, setShowAllThanas] = useState(false);

  const displayedAdvisors = showAllAdvisors ? ALL_ADVISORS : ALL_ADVISORS.slice(0, 4);
  const displayedCentral = showAllCentral ? ALL_CENTRAL : ALL_CENTRAL.slice(0, 5);
  const displayedDistricts = showAllDistricts ? ALL_DISTRICTS : ALL_DISTRICTS.slice(0, 8);

  // Generate a bigger dummy array just so the expand feels huge and realistic
  const ALL_THANAS = [...THANAS, ...Array.from({ length: 476 }, (_, i) => `Thana ${i + 15}`)];
  const displayedThanas = showAllThanas ? ALL_THANAS : THANAS.slice(0, 14);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Leadership network"
        title="Our Committees"
        subtitle="From the President's desk to every thana — meet the dedicated people who carry Team Bangladesh forward."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
        stats={[
          { label: "President", value: "1" },
          { label: "Advisors", value: "30" },
          { label: "Executives", value: "6" },
          { label: "District Reps", value: "64" },
        ]}
      />

      {/* President */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionHeader icon={Crown} eyebrow="At the helm" title="Our President." tone="amber" />
        <Reveal delay={0.1}>
          <div className="max-w-4xl mx-auto">
            <PersonCard p={PRESIDENT} big />
          </div>
        </Reveal>
      </section>

      {/* Advisory */}
      <CollapsibleSection icon={Sparkles} eyebrow="Guiding voices" title="Advisory Committee." bgClass="bg-muted/10 py-12 md:py-16 border-t border-border/50">
        <Reveal delay={0.1}>
          <div className="max-w-4xl mx-auto mb-10">
            <PersonCard p={CHIEF_ADVISOR} big />
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatePresence>
            {displayedAdvisors.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: showAllAdvisors && i > 3 ? (i % 10) * 0.05 : i * 0.08 }} className="h-full">
                <PersonCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {!showAllAdvisors && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setShowAllAdvisors(true)} className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
              Show All 30 Advisors
            </button>
          </div>
        )}
      </CollapsibleSection>

      {/* Executive */}
      <CollapsibleSection icon={Shield} eyebrow="The leadership" title="Executive Committee." bgClass="py-12 md:py-16 border-t border-border/50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {EXEC.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="h-full">
              <PersonCard p={p} />
            </Reveal>
          ))}
        </div>
      </CollapsibleSection>

      {/* Central */}
      <CollapsibleSection icon={Users} eyebrow="Operations" title="Central Committee." bgClass="bg-muted/10 py-12 md:py-16 border-t border-border/50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          <AnimatePresence>
            {displayedCentral.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: showAllCentral && i > 4 ? (i % 10) * 0.05 : i * 0.08 }} className="h-full">
                <PersonCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {!showAllCentral && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setShowAllCentral(true)} className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
              Show All 50 Central Members
            </button>
          </div>
        )}
      </CollapsibleSection>

      {/* District */}
      <CollapsibleSection icon={Building2} eyebrow="District Committees" title="A leader in every district." bgClass="py-12 md:py-16 border-t border-border/50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {displayedDistricts.map((d, i) => (
              <motion.div key={d.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: showAllDistricts && i > 7 ? (i % 8) * 0.05 : i * 0.05 }} className="rounded-2xl border border-border bg-card p-5 group hover:-translate-y-1 transition-transform">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-xl gradient-leaf text-white flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.members.toLocaleString()} members</span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{d.name}</h3>
                <p className="text-sm text-muted-foreground">{d.head}</p>
                <div className="mt-4 h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(100, (d.members / 1300) * 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="h-full gradient-warm"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {!showAllDistricts && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setShowAllDistricts(true)} className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
              Show All 64 Districts
            </button>
          </div>
        )}
      </CollapsibleSection>

      {/* Thana cloud */}
      <section className="bg-ink text-white py-24 relative overflow-hidden">
        <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-leaf/30 blob" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-glow/20 blob" />
        <div className="relative mx-auto max-w-7xl px-5 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="h-4 w-4 text-amber-glow" /> Thana Committees
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 text-white">490+ thanas, one mission.</h2>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">Local heads run grassroots operations — the people who know every street, school and pond in their thana.</p>
          </Reveal>
          <div className="mt-12">
            <div className={`flex flex-wrap gap-3 justify-center max-w-4xl mx-auto transition-all duration-700 ${!showAllThanas ? 'max-h-[300px] overflow-hidden' : ''}`}>
              <AnimatePresence>
                {displayedThanas.map((t, i) => (
                  <motion.span
                    key={i} // Using index because dummy names might overlap
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    viewport={{ once: true }}
                    transition={{ delay: i > 14 ? (i % 20) * 0.02 : i * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-2 text-sm hover:bg-leaf hover:border-leaf transition-colors cursor-pointer"
                  >
                    {t}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            {!showAllThanas && (
              <div className="mt-8 flex justify-center">
                <motion.button 
                  onClick={() => setShowAllThanas(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full gradient-warm text-ink px-6 py-3 text-sm font-semibold cursor-pointer hover:shadow-[0_0_20px_rgba(239,166,87,0.4)] transition-all"
                >
                  + 476 more
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blank White CTA Section */}
      <section className="bg-white py-24 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <h2 className="text-4xl lg:text-5xl font-bold text-ink">Ready to make a difference?</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Join thousands of volunteers across the country and help us build a greener, cleaner, and more humane Bangladesh.
            </p>
            <div className="mt-10">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScIvWrbTFC_giHJ2lQih6JJ6YiJcEbbgzTM-TBF3YDmVKBdjA/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-8 py-4 text-white font-bold tracking-wider uppercase transition-colors hover:text-leaf overflow-hidden z-10 before:absolute before:inset-0 before:w-0 hover:before:w-full before:bg-white before:transition-all before:duration-400 before:-z-10 shadow-lg hover:shadow-xl">
                <span>Join Our Team</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
