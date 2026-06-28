import { type ReactNode } from "react";
import { motion } from "motion/react";
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 w-full"
    >
      {children}
    </motion.main>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  stats,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  stats?: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-32 bg-ink text-white">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-leaf-deep/70" />
      </div>
      <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-leaf/40 blob" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-amber-glow/30 blob" />

      <div className="relative mx-auto max-w-7xl px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="script text-amber-glow text-xl mb-3">{eyebrow}</div>
          <h1 className="text-5xl lg:text-7xl font-bold text-balance max-w-4xl text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">{subtitle}</p>
        </motion.div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-5 hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl font-bold shimmer-text">{s.value}</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <svg className="absolute bottom-0 left-0 w-full h-16 text-background" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,32 C320,80 720,0 1440,48 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
