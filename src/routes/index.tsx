import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Users, Trees, GraduationCap, PawPrint, Stethoscope, Building2,
  Zap, CloudRain, Droplets, HandCoins, ChevronLeft, ChevronRight,
  Target, ListChecks, Quote, Heart, ArrowUpRight, ChevronDown,
  Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Leaf,
} from "lucide-react";
import { SiteNavbar } from "@/components/site/SiteChrome";

import heroBg from "@/assets/hero-bg.jpg";
import unity from "@/assets/unity.png";
import projTree from "@/assets/proj-tree.jpg";
import projAnimal from "@/assets/proj-animal.jpg";
import projMedical from "@/assets/proj-medical.jpg";
import teamPrecident from "@/assets/precident.jpeg";
import teamNazmul from "@/assets/nazmul.png";
import teamLogo from "@/assets/tblogo.png";
import teamAruni from "@/assets/aruni.jpeg";
import teamNahreen from "@/assets/nahreen.jpeg";

import slide1 from "@/assets/slide_img1.jpeg";
import slide2 from "@/assets/slide_img2.jpeg";
import slide3 from "@/assets/slide_img3.jpeg";
import testimonialBg from "@/assets/t2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Team Bangladesh — Let's Build a Greener Future" },
      { name: "description", content: "Team Bangladesh: building a greener, cleaner and healthier Bangladesh through inclusive development, tree plantation, education, and healthcare." },
    ],
  }),
  component: Index,
});

/* ---------- shared bits ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="font-script text-2xl md:text-3xl text-ember mb-2"
    >
      {children}
    </motion.p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-3xl md:text-5xl font-extrabold text-ink"
    >
      {children}
    </motion.h2>
  );
}


/* ---------- hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const slides = [slide1, heroBg, slide2];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section ref={ref} className="relative min-h-[80svh] md:min-h-[100svh] overflow-hidden text-white">
        {slides.map((imgSrc, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: idx === currentSlide ? 1 : 0,
              scale: idx === currentSlide ? 1.05 : 1,
              zIndex: idx === currentSlide ? 1 : 0,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img src={imgSrc} alt="" width={1920} height={1280} className={`h-full w-full object-cover ${idx === 0 ? 'object-[center_65%] md:object-center' : 'object-center'}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-leaf-deep/70 via-leaf-deep/60 to-leaf-deep/95" />
          </motion.div>
        ))}

        {/* floating glass orbs */}
        <div className={`pointer-events-none absolute inset-0 overflow-hidden z-20 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-leaf-glow/20 blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 -right-32 h-[28rem] w-[28rem] rounded-full bg-ember/20 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
        </div>

        <motion.div style={{ opacity }} className="relative z-30 mx-auto max-w-7xl px-4 pt-40 md:pt-48 pb-14 md:pb-40 flex flex-col justify-start items-center h-full min-h-[80svh] md:min-h-[100svh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-left mr-auto"
          >
            <p className="font-script text-2xl md:text-4xl text-ember mb-3">
              Let's build a greener future
            </p>

            <h1 className="font-bengali font-bold text-[2.25rem] xs:text-4xl sm:text-5xl md:text-7xl leading-[1.15] tracking-tight drop-shadow-2xl">
              করবো কাজ – গড়বো দেশ,
              <br />
              <span className="text-gradient-leaf">সবার আগে বাংলাদেশ</span>
            </h1>

            <p className="hidden md:block mt-6 max-w-xl text-base sm:text-lg text-white/80">
              A people-powered movement for inclusive development, a cleaner environment, and a healthier Bangladesh — driven by volunteers, neighborhood by neighborhood.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScIvWrbTFC_giHJ2lQih6JJ6YiJcEbbgzTM-TBF3YDmVKBdjA/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-1.5 rounded-full bg-leaf px-5 py-2.5 md:px-8 md:py-4 text-sm md:text-base text-white font-bold tracking-wider uppercase transition-colors hover:text-leaf overflow-hidden z-10 before:absolute before:inset-0 before:w-0 hover:before:w-full before:bg-white before:transition-all before:duration-400 before:-z-10 shadow-lg hover:shadow-xl pointer-events-auto"
              >
                <span>Join Us</span>
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="#about" className="inline-flex items-center gap-1.5 text-white text-sm md:text-base font-medium hover:text-leaf-glow transition-colors bg-black/20 px-4 py-2.5 md:px-6 md:py-4 rounded-full backdrop-blur-sm border border-white/10">
                Learn more <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
            </div>

            {/* Mobile-only description — shifts position when first slide is active */}
            <p className={`md:hidden max-w-xl text-sm leading-relaxed text-white/90 transition-all duration-700 ease-in-out ${currentSlide === 0 ? 'mt-38' : 'mt-4'}`}>
              A people-powered movement for inclusive development, a cleaner environment, and a healthier Bangladesh — driven by volunteers, neighborhood by neighborhood.
            </p>
          </motion.div>
        </motion.div>

        {/* wave divider */}
        <svg className="absolute bottom-0 left-0 right-0 z-10 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 60, display: 'block' }}>
          <path fill="var(--ivory)" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>
    </>
  );
}

/* ---------- about ---------- */

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const dur = 1600;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-leaf-glow/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-ember/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-leaf-glow/30 to-ember/20 blur-2xl" />
          <img src={teamLogo} alt="Team Bangladesh Logo" width={800} height={800} className="relative h-full w-full object-contain animate-float-slow" loading="lazy" />
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
            <div className="relative grid h-28 w-28 md:h-32 md:w-32 place-items-center rounded-full bg-gradient-to-br from-leaf to-leaf-deep text-white text-center shadow-2xl animate-pulse-ring">
              <div>
                <div className="flex items-center justify-center gap-1">
                  <Leaf className="h-4 w-4" />
                </div>
                <div className="font-extrabold text-sm mt-1">Since 2026</div>
                <div className="text-[10px] mt-0.5 opacity-90">Bangladesh First</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionEyebrow>Who We Are</SectionEyebrow>
          <SectionTitle>Team Bangladesh</SectionTitle>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-leaf/10 px-4 py-2 text-sm font-semibold text-leaf-deep"
          >
            <Heart className="h-4 w-4" /> Registered under Social Welfare of Bangladesh
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted-foreground leading-relaxed"
          >
            Team Bangladesh is a national civic youth movement committed to building a better Bangladesh through responsible leadership, unity and community services, guided by the inspiring motto: "BANGLADESH FIRST."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-muted-foreground leading-relaxed"
          >
            We empower specially young people by developing both hard and soft skills, enabling them to solve local challenges and create positive social change.
            Together, we believe that a stronger nation is built by responsible citizens who lead with integrity, compassion and purposeful action.
          </motion.p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { n: 24, l: "Months of Impact" },
              { n: 1000, l: "Trees Planted" },
              { n: 100, l: "Peoples Helped" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-leaf-deep">
                  <Counter to={s.n} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- key areas ---------- */

const AREAS = [
  { icon: Users, title: "Inclusive Development", desc: "Social, Educational, Environmental, Health..." },
  { icon: Trees, title: "Tree Plantation", desc: "Biodiversity conservation and mass plantation across Bangladesh." },
  { icon: GraduationCap, title: "Educational Development", desc: "Implicit Learning based most effective education - developed by Dr Muhit A Rana" },
  { icon: PawPrint, title: "Care for Homeless Paws", desc: "Ensuring welfare, rescue, and care for street and wild animals." },
  { icon: Stethoscope, title: "Free Mega Medical Campaign", desc: "Providing essential free medical services to underprivileged communities." },
  { icon: Building2, title: "Green City - Clean City", desc: "Clean city initiatives for better, pollution-free urban life." },
  { icon: Zap, title: "Renewable Energy Solutions", desc: "Solar energy is a sustainable solution to power our lives without harming the planet" },
  { icon: CloudRain, title: "Climate Change", desc: "Disaster management and climate resilience building." },
  { icon: Droplets, title: "Rainwater Harvesting", desc: "Saving rainwater today for safe drinking tomorrow" },
  { icon: HandCoins, title: "Talent Beyond Poverty", desc: "Opening doors of opportunity for deserving poorer learners." },
];

function KeyAreas() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-ivory to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <SectionEyebrow>Our Key Initiatives</SectionEyebrow>
        <SectionTitle>Key Areas of Action</SectionTitle>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8 }}
              className="group glass-card rounded-3xl p-5 md:p-6 text-left relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-leaf-glow/20 blur-2xl group-hover:bg-leaf-glow/40 transition" />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-leaf to-leaf-deep text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition">
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="relative mt-5 font-extrabold text-ink text-base md:text-lg">{a.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ongoing projects ---------- */

const PROJECTS = [
  { img: projTree, title: "Tree Plantation", desc: "Planting native species across districts to revive lost canopy." },
  { img: projAnimal, title: "Street Animal Care", desc: "Rescue, feed and treat the animals who share our streets." },
  { img: projMedical, title: "Free Mega Medical Camp", desc: "Bringing doctors, medicine and care to underserved towns." },
];

function Projects() {
  return (
    <section className="relative py-24 md:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <SectionEyebrow>What We Have Done So Far</SectionEyebrow>
        <SectionTitle>Our Ongoing Projects</SectionTitle>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} width={800} height={600} loading="lazy" className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-leaf-deep/95 via-leaf-deep/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
                <h3 className="text-xl md:text-2xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm text-white/85 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
                  {p.desc}
                </p>
              </div>
              <div className="absolute top-4 right-4 glass rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
                <ChevronRight className="h-4 w-4 text-ink" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- executive team ---------- */

const TEAM = [
  {
    name: "Dr Muhit A Rana",
    role: "Member",
    org: "Team Bangladesh",
    img: teamPrecident,
    bio: "Organising the core operations of Team Bangladesh, ensuring that our environmental and social policies translate into actionable community goals.",
    fb: "https://www.facebook.com/muhitrana",
  },
  {
    name: "Nazmul",
    role: "Member",
    org: "Team Bangladesh",
    img: teamNazmul,
    bio: "Actively contributing to the strategic and humanitarian operations of Team Bangladesh, driving progressive change within the community.",
    fb: "#",
  },
  {
    name: "Rakin",
    role: "Member",
    org: "Team Bangladesh",
    img: teamLogo,
    bio: "Providing crucial guidance and leadership to ensure that Team Bangladesh successfully meets its environmental and legal developmental targets.",
    fb: "#",
  },
  {
    name: "Salima Talukder Aruni",
    role: "Member",
    org: "Team Bangladesh",
    img: teamAruni,
    bio: "Passionate about sustainability, social progress, and helping communities adapt to a better lifestyle through innovative programs and grassroots engagement.",
    fb: "https://www.facebook.com/61581136721878/photos",
  },
  {
    name: "Nahreen Asghar",
    role: "Member",
    org: "Team Bangladesh",
    img: teamNahreen,
    bio: "Actively contributing to the strategic and humanitarian operations of Team Bangladesh, driving progressive change within the community.",
    fb: "#",
  },
  {
    name: "Sultana Ahmed, MP",
    role: "Member",
    org: "Team Bangladesh",
    img: teamLogo,
    bio: "Actively contributing to the strategic and humanitarian operations of Team Bangladesh, driving progressive change within the community.",
    fb: "#",
  },
];

function Team() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % TEAM.length);
  const prev = () => setIdx((i) => (i - 1 + TEAM.length) % TEAM.length);
  const m = TEAM[idx];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-secondary/40 to-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <SectionEyebrow>Leadership</SectionEyebrow>
        <SectionTitle>Our Executive Team</SectionTitle>

        <div className="relative mt-14 px-2 md:px-16">
          <div className="glass-card rounded-3xl p-6 md:p-12 mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center text-left"
              >
                <div className="relative mx-auto flex-shrink-0">
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-leaf-glow to-ember opacity-50 blur-xl" />
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-[400px] md:w-[400px] rounded-3xl border-4 border-white shadow-2xl bg-white"
                    style={{ objectFit: (m.name === 'Rakin' || m.name === 'Sultana Ahmed, MP') ? 'contain' : 'cover' }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink">{m.name}</h3>
                  <p className="mt-2 text-leaf font-semibold">{m.role}</p>
                  <p className="mt-1 text-leaf-deep font-bold">{m.org}</p>
                  <p className="mt-5 text-muted-foreground leading-relaxed">{m.bio}</p>
                  <div className="mt-6 flex gap-3">
                    <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-leaf/10 text-leaf-deep hover:bg-leaf hover:text-white transition">
                      <Youtube className="h-4 w-4" />
                    </a>
                    <a href={m.fb} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-leaf/10 text-leaf-deep hover:bg-leaf hover:text-white transition">
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-leaf/10 text-leaf-deep hover:bg-leaf hover:text-white transition">
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-leaf/10 text-leaf-deep hover:bg-leaf hover:text-white transition">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={prev} aria-label="Previous" className="hidden md:grid absolute left-0 md:left-2 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full glass hover:scale-110 transition shadow-lg z-10">
            <ChevronLeft className="h-5 w-5 text-leaf-deep" />
          </button>
          <button onClick={next} aria-label="Next" className="hidden md:grid absolute right-0 md:right-2 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full glass hover:scale-110 transition shadow-lg z-10">
            <ChevronRight className="h-5 w-5 text-leaf-deep" />
          </button>

          <div className="mt-8 flex justify-center items-center gap-4">
            <button onClick={prev} aria-label="Previous" className="md:hidden grid h-10 w-10 place-items-center rounded-full glass hover:scale-110 transition shadow-lg z-10">
              <ChevronLeft className="h-5 w-5 text-leaf-deep" />
            </button>
            <div className="flex gap-2">
              {TEAM.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-leaf" : "w-2 bg-leaf/30"}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next" className="md:hidden grid h-10 w-10 place-items-center rounded-full glass hover:scale-110 transition shadow-lg z-10">
              <ChevronRight className="h-5 w-5 text-leaf-deep" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------- mission ---------- */

function Mission() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden text-white" style={{ background: "linear-gradient(135deg, oklch(0.18 0.04 250), oklch(0.22 0.05 220))" }}>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-leaf/40 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-ember/30 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <p className="font-script text-3xl text-ember mb-2">Our Mission</p>
        <h2 className="text-3xl md:text-5xl font-extrabold">A coordinated movement, grounded in trust</h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          The group coordinates policymaking, planning, and decision-making among local committee members.
        </p>

        <div className="mt-14 grid md:grid-cols-2 gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-dark rounded-3xl p-8"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ember/20 text-ember mb-5">
              <Target className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-extrabold">OUR VISION</h3>
            <p className="mt-1 text-white/75 font-semibold">The Bangladesh We Are Building_</p>
            <p className="mt-3 text-white/75 leading-relaxed">
              We envision a prosperous, just and united Bangladesh where every young person becomes a force for positive change.<br />
              A Bangladesh where citizens are responsible, communities are strong, institutions are trusted and people work together to build a better future for everyone.<br />
              Because, Bangladesh First.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-dark rounded-3xl p-8"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ember/20 text-ember mb-5">
              <ListChecks className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-extrabold">CORE VALUES:</h3>
            <p className="mt-1 text-white/75">The principles that guide everything we do_</p>
            <ul className="mt-4 space-y-3 text-white/75">
              {[
                { title: "INTEGRITY", desc: "We act with honesty, transparency and accountability." },
                { title: "UNITY", desc: "We respect diversity and work together for a common purpose." },
                { title: "INNOVATION", desc: "We embrace new ideas and practical solutions for national progress." },
                { title: "RESPONSIBILITY", desc: "We take responsibility for our society, environment and future." },
                { title: "DEDICATION", desc: "We serve with commitment, passion and selflessness." },
                { title: "EXCELLENCE", desc: "We strive for the highest standards in character, skills and service." },
              ].map((t) => (
                <li key={t.title} className="flex gap-2 text-sm md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  <div>
                    <span className="font-bold text-white">{t.title} - </span>
                    <span>{t.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonial ---------- */

const TESTIMONIALS = [
  {
    quote: "The dedication of Team Bangladesh towards educational development is inspiring. My students are now actively participating in campaigns thanks to their interactive workshops.",
    name: "Nusrat Jahan",
    role: "School Teacher",
  },
  {
    quote: "As an academic, I deeply appreciate the empirical approach Team Bangladesh takes towards climate change. Their models and community outreach are exceptional.",
    name: "Dr. Hasan Ali",
    role: "Professor",
  },
  {
    quote: "Team Bangladesh has fundamentally transformed our infrastructure. Their green city initiative shows great engineering foresight.",
    name: "Rafiqul Islam",
    role: "Civil Engineer",
  },
  {
    quote: "Their mega medical camps have provided essential healthcare to thousands. I am proud to volunteer my services with such a dedicated team.",
    name: "Dr. Sarah Ahmed",
    role: "Medical Doctor",
  },
  {
    quote: "The administrative coordination of Team Bangladesh makes my job easier. They handle operations smoothly and align with national developmental goals.",
    name: "Tariq Mahmud",
    role: "Government Officer",
  },
];

function Testimonial() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section id="testimonials" className="relative py-28 md:py-36 overflow-hidden text-white">
      <div className="absolute inset-0">
        <img src={testimonialBg} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <p className="font-script text-3xl text-ember mb-2">What People Say</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold text-white"
        >
          Testimonial
        </motion.h2>

        <div className="mt-12 relative" style={{ minHeight: 240 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 md:p-12 relative text-left border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <Quote className="absolute top-6 left-6 h-8 w-8 text-ember" />
              <p className="text-lg md:text-xl italic text-white/90 leading-relaxed pt-4">
                "{t.quote}"
              </p>
              <div className="mt-6">
                <div className="font-extrabold text-white text-lg">{t.name}</div>
                <div className="text-sm text-white/60 mt-1">{t.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section id="join" className="relative py-20 md:py-24 overflow-hidden" style={{ background: "linear-gradient(120deg, oklch(0.78 0.13 130), oklch(0.7 0.16 145))" }}>
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ height: 200 }}>
          <path fill="white" fillOpacity="0.3" d="M0,100 Q360,180 720,100 T1440,100 L1440,200 L0,200 Z" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-6xl px-4 grid md:grid-cols-[1fr_auto] items-center gap-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink leading-tight">
            Let's build a greener, cleaner and<br />healthier Bangladesh – together.
          </h2>
        </div>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScIvWrbTFC_giHJ2lQih6JJ6YiJcEbbgzTM-TBF3YDmVKBdjA/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-white font-bold shadow-2xl hover:scale-105 transition whitespace-nowrap">
          Join as Volunteer
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}


/* ---------- page ---------- */

function Index() {
  return (
    <div className="bg-ivory text-ink overflow-x-hidden">
      <SiteNavbar transparentOnTop />
      <Hero />
      <About />
      <KeyAreas />
      <Projects />
      <Team />
      <Mission />
      <Testimonial />
      <CTA />
    </div>
  );
}
