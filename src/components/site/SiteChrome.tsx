import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Menu, X, Mail, Phone, MapPin,
  Facebook, Instagram, Twitter, Youtube, ChevronDown, ChevronRight,
} from "lucide-react";

import splash1Src from "@/assets/splash-1.png";
import splash2Src from "@/assets/splash-2.png";
import splash3Src from "@/assets/splash-3.png";
import sobarLogoSrc from "@/assets/sobar-agge-logo.png";
import tbLogoSrc from "@/assets/tblogo.png";
import splashAudioSrc from "@/assets/splashscreen.mp3";

/* ---------- nav data ---------- */
export type NavItem = { label: string; to?: string; href?: string; items?: NavItem[] };
type NavEntry = NavItem;

const NAV: NavEntry[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    items: [
      { label: "Our Mission And Vision", to: "/mission" },
      { label: "How We Work", href: "/#about" },
      { label: "Our Committees", to: "/committees" },
      { label: "Our Working Arenas", href: "/#areas" },
      { label: "Partners", href: "/#partners" },
      { label: "Contact Us", href: "/#contact" },
    ],
  },
  { label: "Campaigns", to: "/campaigns" },
  {
    label: "More",
    items: [
      {
        label: "Monthly Recognition",
        items: [
          { label: "Green Lover of this month", href: "#" },
          { label: "Green School of this month", href: "#" },
          { label: "Animal Lover of this month", href: "#" },
          { label: "Best Student of this month", href: "#" },
          { label: "Best Teacher of this month", href: "#" },
          { label: "Best Social Worker of this month", href: "#" },
          { label: "Best Mother of this month", href: "#" },
          { label: "Best Father of this month", href: "#" },
          { label: "Green Club / Society", href: "#" },
          { label: "Great Volunteer", href: "#" },
          { label: "Great Leader", href: "#" },
          { label: "Best District Committee", href: "#" },
          { label: "Best Thana Committee", href: "#" },
        ],
      },
      { label: "Events", to: "/events" },
      { label: "Campaigns", to: "/campaigns" },
      { label: "Our Committees", to: "/committees" },
      { label: "Photo Gallery", href: "#" },
      { label: "Video Gallery", href: "#" },
      { label: "Blog", href: "#" },
      { label: "FAQ", to: "/faq" },
      { label: "Join With Us (Volunteer)", href: "https://docs.google.com/forms/d/e/1FAIpQLScIvWrbTFC_giHJ2lQih6JJ6YiJcEbbgzTM-TBF3YDmVKBdjA/viewform?usp=publish-editor" },
      { label: "Products", href: "#" },
      { label: "Donation", to: "/donate" },
    ],
  },
];

let splashPlayedGlobal = false;

/* ---------- splash screen ---------- */
function SplashScreen({ onDone }: { onDone: (logoEl: HTMLImageElement | null, wrapper: HTMLDivElement | null) => void }) {
  const s1 = useRef<HTMLImageElement>(null);
  const s2 = useRef<HTMLImageElement>(null);
  const s3 = useRef<HTMLImageElement>(null);
  const sLogo = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    let audioStarted = false;
    let interactionFn: (() => void) | null = null;

    // Lock body scroll while splash is active
    document.body.style.overflow = 'hidden';

    const killInteractionListener = () => {
      if (interactionFn) {
        window.removeEventListener('click', interactionFn);
        window.removeEventListener('touchend', interactionFn);
        interactionFn = null;
      }
    };

    const startTime = Date.now();

    if (audio && !hasPlayed.current) {
      hasPlayed.current = true;
      audio.volume = 0.8;
      // Do NOT call audio.load() — it aborts the preload fetch and resets
      // the decoder, causing a stutter/glitch at the start of playback.
      // preload="auto" on the element already handles buffering.

      audio.play().catch(err => console.log("Autoplay blocked or failed:", err));

      interactionFn = () => {
        if (audio && audio.paused) {
          // Only seek + resume if autoplay was actually blocked (audio is paused).
          // If audio is already playing, touching the screen must NOT seek —
          // that forced seek is what caused the mid-playback glitch.
          const elapsed = (Date.now() - startTime) / 1000;
          if (elapsed < 4.5) {
            audio.currentTime = elapsed;
            audio.play().catch(() => { });
          }
        }
        killInteractionListener();
      };

      window.addEventListener('click', interactionFn);
      window.addEventListener('touchend', interactionFn);
    }

    const t1 = setTimeout(() => { if (s1.current) s1.current.style.opacity = '1'; }, 200);
    const t2 = setTimeout(() => { if (s2.current) s2.current.style.opacity = '1'; }, 1200);
    const t3 = setTimeout(() => { if (s3.current) s3.current.style.opacity = '1'; }, 2200);
    const t4 = setTimeout(() => {
      if (sLogo.current) sLogo.current.style.opacity = '1';
      if (s1.current) s1.current.style.display = 'none';
      if (s2.current) s2.current.style.display = 'none';
      if (s3.current) s3.current.style.display = 'none';
    }, 3400);

    // At 3500ms: logo is at full opacity, background still white → perfect moment to morph
    const t5 = setTimeout(() => {
      killInteractionListener();
      // Restore scroll when splash is about to end
      document.body.style.overflow = '';
      // Hand off immediately — logo is fully visible right now.
      // Pass wrapperRef so parent can fade it out.
      onDone(sLogo.current, wrapperRef.current);
    }, 3500);

    // Audio fade-out and stop exactly at 4500ms (when morph ends)
    const t6 = setTimeout(() => {
      if (audio) {
        const fadeAudio = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume = Math.max(0, audio.volume - 0.1);
          } else {
            audio.pause();
            clearInterval(fadeAudio);
          }
        }, 50);
      }
    }, 4500);

    return () => {
      killInteractionListener();
      // Always restore scroll on cleanup
      document.body.style.overflow = '';
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
      hasPlayed.current = false;
    };
  }, [onDone]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div ref={wrapperRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <audio ref={audioRef} src={splashAudioSrc} preload="auto" />
      <div style={{ position: 'relative', width: 400, height: 400, marginTop: '10vh' }}>
        <img ref={s1} src={splash1Src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: 'auto', opacity: 0, transition: 'opacity 1s ease', zIndex: 1 }} />
        <img ref={s2} src={splash2Src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: 'auto', opacity: 0, transition: 'opacity 1s ease', zIndex: 2 }} />
        <img ref={s3} src={splash3Src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: 'auto', opacity: 0, transition: 'opacity 1s ease', zIndex: 3 }} />
        <img ref={sLogo} src={sobarLogoSrc} alt="Sobar agge Bangladesh" style={{ position: 'absolute', inset: 0, width: '100%', height: 'auto', opacity: 0, zIndex: 4 }} />
      </div>
    </div>,
    document.body
  );
}

function NavLeaf({ it, className, onClick }: { it: NavItem; className: string; onClick?: () => void }) {
  if (it.to) return <Link to={it.to} className={className} onClick={onClick}>{it.label}</Link>;
  return <a href={it.href ?? "#"} className={className} onClick={onClick}>{it.label}</a>;
}

/* ---------- animated dropdown item ---------- */
function DropdownItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-ink rounded-3xl p-8 shadow-2xl overflow-hidden text-white"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/60 hover:text-amber-glow transition-colors rounded-full">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Contact Us</h2>
        <div className="grid gap-6">
          <div className="flex gap-4">
            <div className="flex items-start justify-center text-amber-glow shrink-0 mt-1">
              <Phone className="h-7 w-7" />
            </div>
            <div>
              <div className="font-bold text-white text-lg">Hotline</div>
              <div className="text-white/80">+880 1911-480021</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-start justify-center text-amber-glow shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-white text-lg">WhatsApp</div>
              <div className="text-white/80">+880 1911-480021</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-start justify-center text-amber-glow shrink-0 mt-1">
              <Mail className="h-7 w-7" />
            </div>
            <div>
              <div className="font-bold text-white text-lg">Email Address</div>
              <div className="text-white/80">Contact.TeamBangladesh@gmail.com</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-start justify-center text-amber-glow shrink-0 mt-1">
              <MapPin className="h-7 w-7" />
            </div>
            <div>
              <div className="font-bold text-white text-lg">Address</div>
              <div className="text-white/80">Banani, Dhaka, Bangladesh</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- shared navbar ---------- */
let navMountedGlobal = false;

/* ---------- shared navbar ---------- */
export function SiteNavbar({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [isInitialMount] = useState(!navMountedGlobal);

  useEffect(() => {
    navMountedGlobal = true;
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  const isHome = typeof window !== 'undefined' && window.location.pathname === '/';
  const [showSplash, setShowSplash] = useState(!splashPlayedGlobal && isHome);
  // navVisible is false only while the white splash bg is fully covering the screen.
  // It becomes true the instant onDone fires (white bg starts fading) so the navbar
  // is visible during the logo morph animation rather than popping in at the end.
  const [navVisible, setNavVisible] = useState(splashPlayedGlobal || !isHome);
  const sobarNavRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!splashPlayedGlobal) {
      splashPlayedGlobal = true;
    }
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const handleHashClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && (target.getAttribute('href') === '/#contact' || target.getAttribute('href') === '#contact')) {
        e.preventDefault();
        setShowContact(true);
      }
    };
    window.addEventListener('click', handleHashClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener('click', handleHashClick);
    };
  }, []);

  // when not transparent (sub-pages), always treat as scrolled (glass light bar)
  const useGlassLight = scrolled || !transparentOnTop;

  return (
    <motion.header
      initial={isInitialMount ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
      style={!navVisible ? { visibility: 'hidden', pointerEvents: 'none' } : undefined}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${useGlassLight ? "glass" : "glass-dark"
          }`}>
          {showSplash && (
            <SplashScreen onDone={(logoEl, wrapper) => {
              // Make navbar visible immediately as the white bg starts fading.
              // The logo clone will fly from splash→nav, so the bar itself should be visible now.
              setNavVisible(true);

              if (logoEl && sobarNavRef.current) {
                const nav = sobarNavRef.current;

                // 1. Snapshot positions while logo is at FULL opacity (bg still white)
                const startRect = logoEl.getBoundingClientRect();
                const targetRect = nav.getBoundingClientRect();

                // 2. Create clone at exact same screen position with a clean slate
                const clone = logoEl.cloneNode(false) as HTMLImageElement;
                clone.style.cssText = [
                  'position:fixed',
                  `left:${startRect.left}px`,
                  `top:${startRect.top}px`,
                  `width:${startRect.width}px`,
                  `height:${startRect.height}px`,
                  'right:auto',
                  'bottom:auto',
                  'margin:0',
                  'padding:0',
                  'opacity:1',
                  'object-fit:contain',
                  `z-index:10000`,
                ].join(';');
                document.body.appendChild(clone);

                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setTimeout(() => {
                      logoEl.style.transition = 'none';
                      logoEl.style.opacity = '0';
                    }, 50);

                    if (wrapper) {
                      wrapper.style.transition = 'opacity 1s ease';
                      wrapper.style.opacity = '0';
                    }

                    clone.style.transition = [
                      'left 1s cubic-bezier(0.25,0.1,0.25,1)',
                      'top 1s cubic-bezier(0.25,0.1,0.25,1)',
                      'width 1s cubic-bezier(0.25,0.1,0.25,1)',
                      'height 1s cubic-bezier(0.25,0.1,0.25,1)',
                    ].join(',');
                    clone.style.left = targetRect.left + 'px';
                    clone.style.top = targetRect.top + 'px';
                    clone.style.width = targetRect.width + 'px';
                    clone.style.height = targetRect.height + 'px';

                    setTimeout(() => {
                      clone.remove();
                      if (sobarNavRef.current) {
                        sobarNavRef.current.style.opacity = '1';
                        sobarNavRef.current.style.visibility = 'visible';
                      }
                      splashPlayedGlobal = true;
                      setShowSplash(false);
                    }, 1100);
                  });
                });
              } else {
                splashPlayedGlobal = true;
                setShowSplash(false);
              }
            }} />
          )}

          <Link to="/" className="flex items-center gap-1.5 shrink-0 group -ml-1">
            <img
              ref={sobarNavRef}
              src={sobarLogoSrc}
              alt="Sobar agge Bangladesh"
              className="object-contain"
              style={{ height: 32, width: 'auto', opacity: showSplash ? 0 : 1, visibility: showSplash ? 'hidden' : 'visible' }}
            />
            <span className={`font-extrabold text-xl tracking-tight ${useGlassLight ? "text-ink" : "text-white"}`}>
              TEAM BANGLADESH
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((m) => {
              const isActive = activeMenu === m.label;
              const triggerClass = `relative flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors ${useGlassLight ? "text-ink hover:text-leaf" : "text-white/90 hover:text-white"
                }`;

              const underline = (
                <motion.span
                  layoutId="nav-underline-hover"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-leaf to-ember"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              );

              if (!m.items) {
                return (
                  <div
                    key={m.label}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(m.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className={triggerClass}>
                      <NavLeaf it={m} className="px-0 py-0" />
                      {isActive && underline}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={m.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(m.label)}
                  onMouseLeave={() => { setActiveMenu(null); setActiveSub(null); }}
                >
                  <button className={triggerClass}>
                    {m.label}
                    <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                    {isActive && underline}
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full pt-6 w-64"
                      >
                        <div className="glass-card rounded-xl p-2 shadow-2xl ring-1 ring-leaf/10" style={{ minWidth: 240 }}>

                          {m.items!.map((it, idx) => {
                            if (it.items) {
                              const subActive = activeSub === it.label;
                              return (
                                <div
                                  key={it.label}
                                  className="relative"
                                  onMouseEnter={() => setActiveSub(it.label)}
                                  onMouseLeave={() => setActiveSub(null)}
                                >
                                  <div className="absolute right-0 top-0 bottom-0 w-16 -mr-16" />
                                  <motion.button
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ x: 6 }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl ${subActive ? 'bg-leaf/10 text-leaf-deep' : 'text-ink hover:bg-leaf/10 hover:text-leaf-deep'}`}
                                  >
                                    <span>{it.label}</span>
                                    <motion.span animate={{ x: subActive ? 4 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                                      <ChevronRight className="h-4 w-4 shrink-0" />
                                    </motion.span>
                                  </motion.button>
                                  <AnimatePresence>
                                    {subActive && (
                                      <motion.div
                                        initial={{ opacity: 0, x: -14, scale: 0.94 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -10, scale: 0.96 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute left-full top-0 pl-6 w-64"
                                      >
                                        <div className="glass-card rounded-xl p-2 shadow-2xl ring-1 ring-leaf/10" style={{ minWidth: 260 }}>
                                          {it.items.map((sub, sidx) => (
                                            <motion.div
                                              key={sub.label}
                                              initial={{ opacity: 0, x: -8 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: sidx * 0.03, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                              whileHover={{ x: 6 }}
                                            >
                                              <NavLeaf
                                                it={sub}
                                                className="block px-4 py-2.5 text-sm font-medium text-ink hover:bg-leaf/10 hover:text-leaf-deep transition-all rounded-xl"
                                              />
                                            </motion.div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            }
                            return (
                              <motion.div
                                key={it.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ x: 6 }}
                              >
                                <NavLeaf
                                  it={it}
                                  className="block px-4 py-2.5 text-sm font-medium text-ink hover:bg-leaf/10 hover:text-leaf-deep transition-all rounded-xl"
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <a
              href="/donate"
              className="ml-3 group relative overflow-hidden inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-leaf text-white text-sm font-bold uppercase tracking-wider transition-colors hover:text-leaf z-10 before:absolute before:inset-0 before:w-0 hover:before:w-full before:bg-white before:transition-all before:duration-400 before:-z-10 shadow-lg hover:shadow-xl"
            >
              <span>Donate</span>
            </a>
          </nav>

          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${useGlassLight ? "text-ink" : "text-white"}`}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2"
            >
              <div className="rounded-xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 overflow-hidden max-h-[calc(100dvh-90px)] overflow-y-auto">
                {NAV.map((m, mi) => {
                  if (!m.items) {
                    return (
                      <NavLeaf
                        key={m.label}
                        it={m}
                        onClick={() => setOpen(false)}
                        className={`block w-full px-4 py-3 text-xs font-bold uppercase tracking-widest text-ink hover:bg-leaf hover:text-white transition-colors ${mi > 0 ? 'border-t border-black/5' : ''}`}
                      />
                    );
                  }
                  const isOpen = activeMenu === m.label;
                  return (
                    <div key={m.label} className={mi > 0 ? 'border-t border-black/5' : ''}>
                      <button
                        onClick={() => setActiveMenu(isOpen ? null : m.label)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest text-ink transition-colors ${isOpen ? 'bg-leaf text-white' : 'hover:bg-leaf/8 hover:text-leaf-deep'}`}
                      >
                        <span>{m.label}</span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                          <ChevronDown className="h-3.5 w-3.5" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden bg-leaf/5"
                          >
                            <div className="px-3 py-2 flex flex-col gap-0.5">
                              {m.items.map((it) => {
                                if (it.items) {
                                  const subOpen = activeSub === it.label;
                                  return (
                                    <div key={it.label}>
                                      <button
                                        onClick={() => setActiveSub(subOpen ? null : it.label)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-ink rounded-lg transition-colors ${subOpen ? 'bg-leaf text-white' : 'hover:bg-white hover:shadow-sm'}`}
                                      >
                                        <span>{it.label}</span>
                                        <motion.span animate={{ rotate: subOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                                          <ChevronDown className="h-3 w-3" />
                                        </motion.span>
                                      </button>
                                      <AnimatePresence initial={false}>
                                        {subOpen && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                          >
                                            <div className="pl-3 pt-0.5 pb-1.5 flex flex-col gap-0.5 border-l-4 border-leaf ml-1 rounded-bl-lg">
                                              {it.items.map((sub) => (
                                                <NavLeaf key={sub.label} it={sub} onClick={() => setOpen(false)} className="block px-3 py-2 text-xs text-ink font-medium rounded-lg hover:bg-leaf/10 hover:text-leaf-deep transition-all" />
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                }
                                return (
                                  <NavLeaf key={it.label} it={it} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-xs text-ink font-medium rounded-lg hover:bg-white hover:shadow-sm transition-all" />
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <div className="p-3 border-t border-black/8">
                  <Link
                    to="/donate"
                    onClick={() => setOpen(false)}
                    className="group relative overflow-hidden flex items-center justify-center w-full py-3.5 rounded-full bg-leaf text-white font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transition-colors hover:text-leaf z-10 before:absolute before:inset-0 before:w-0 hover:before:w-full before:bg-white before:transition-all before:duration-400 before:-z-10"
                  >
                    <span>Donate Now</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showContact && <ContactPopup onClose={() => setShowContact(false)} />}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- shared footer ---------- */
export function SiteFooter() {
  return (
    <footer id="donate" className="relative bg-ink text-white overflow-hidden">
      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-ember/20 blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={tbLogoSrc} alt="Team Bangladesh Logo" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
            <div className="font-bold">TeamBD</div>
          </div>
          <p className="font-script text-ember text-sm">… because Bangladesh First.</p>
          <p className="text-white/60 text-sm mt-4 leading-relaxed">
            A volunteer-powered movement for a greener, kinder, and more equitable Bangladesh.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/groups/895660733312485/?ref=share&mibextid=NSMWBT" },
              { Icon: Instagram, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Youtube, href: "#" }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href !== "#" ? "_blank" : undefined}
                rel={item.href !== "#" ? "noopener noreferrer" : undefined}
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-leaf hover:border-leaf transition-colors"
              >
                <item.Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            {[
              { label: "About Us", href: "/#about" },
              { label: "Our Activities", href: "/#areas" },
              { label: "Organization Policies", href: "#" },
              { label: "Donation", href: "/#join" },
            ].map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-ember transition story-link">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Help</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            {[
              { label: "FAQ", href: "#" },
              { label: "Support", href: "#" },
              { label: "Contact Us", href: "/#contact" },
            ].map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-ember transition story-link">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Contact Info</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> Bangladesh</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> Contact.TeamBangladesh@gmail.com</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> +880 1911-480021</li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-2 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
          <div className="font-script text-ember text-sm">For causes that</div>
          <h3 className="text-white text-2xl font-bold mb-3">Really Matter</h3>
          <p className="text-white/60 text-sm mb-4">Join the newsletter — field updates & ways to help.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.open("https://docs.google.com/forms/d/e/1FAIpQLScIvWrbTFC_giHJ2lQih6JJ6YiJcEbbgzTM-TBF3YDmVKBdjA/viewform", "_blank");
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="your@email"
              className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-leaf-glow"
            />
            <button type="submit" className="rounded-full bg-gradient-to-r from-ember to-leaf-glow px-4 py-2.5 text-sm font-semibold text-ink shrink-0 hover:shadow-lg hover:shadow-ember/30 transition-all">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-10 lg:px-16 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/50">
          <p>© 2024 Team Bangladesh. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-leaf-glow transition">Terms of use</a>
            <a href="#" className="hover:text-leaf-glow transition">Privacy policy</a>
            <a href="#" className="hover:text-leaf-glow transition">Cookie policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
