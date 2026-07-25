import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MENU = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];
const BRAND = { first: "Iqbal", last: "Musyaffa" };
const ACCENT = "#8245ec";

/* ======= Utility: prefers-reduced-motion ======= */
function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!m.matches);
    update();
    m.addEventListener?.("change", update);
    return () => m.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/* ======= Utility: nav height via ResizeObserver ======= */
function useElementHeight(ref) {
  const [h, setH] = useState(0);
  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const newH = Math.ceil(entry.contentRect.height);
      setH((prev) => (prev !== newH ? newH : prev));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return h;
}

/* ======= Utility: rAF-backed scroll state ======= */
function useRafScrollFlag(offset = 50) {
  const [flag, setFlag] = useState(false);
  const ticking = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > offset;
        setFlag((prev) => (prev !== next ? next : prev));
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return flag;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(MENU[0]?.id || "");
  const navRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const toggleRef = useRef(null);

  const navHeight = useElementHeight(navRef);
  const reducedMotion = useReducedMotionPref();
  const isScrolled = useRafScrollFlag(50);

  /* ======= Remove scrollMarginTop (now using manual scrollTo) ======= */

  /* ======= Active section highlight (Scroll Position) ======= */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + navHeight + 150; // offset untuk memicu perubahan lebih awal
      let currentSection = activeSection;

      // Loop dari bawah ke atas untuk menemukan section terakhir yang offsetTop-nya terlewati
      for (let i = MENU.length - 1; i >= 0; i--) {
        const section = document.getElementById(MENU[i].id);
        if (section) {
          if (section.offsetTop <= scrollPosition) {
            currentSection = MENU[i].id;
            break;
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Panggil sekali saat mount untuk set state awal
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navHeight, activeSection]);

  /* ======= Smooth scroll ======= */
  const goTo = useCallback(
    (id) => {
      setIsOpen(false);
      const el = document.getElementById(id);
      if (!el) return;
      
      const offset = navHeight + 20; // Additional padding above title
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: reducedMotion ? "auto" : "smooth"
      });
    },
    [reducedMotion, navHeight]
  );

  /* ======= ESC & klik di luar untuk menutup ======= */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onPointerDown = (e) => {
      if (!isOpen) return;
      const target = e.target;
      if (toggleRef.current?.contains(target)) return;
      if (mobilePanelRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  /* ======= Lock body scroll saat mobile menu terbuka ======= */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  /* ======= Framer Motion variants ======= */
  const navVariants = useMemo(
    () => ({
      initial: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: reducedMotion ? 0 : 0.3, ease: "easeOut" },
      },
    }),
    [reducedMotion]
  );

  const itemVariants = useMemo(
    () => ({
      initial: { y: 8, opacity: 0 },
      show: (i) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: reducedMotion ? 0 : 0.04 * i,
          duration: reducedMotion ? 0 : 0.2,
          ease: "easeOut",
        },
      }),
    }),
    [reducedMotion]
  );

  /* ======= Skip link ======= */
  const SkipLink = (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10002] focus:bg-black/75 focus:text-white focus:px-3 focus:py-2 focus:rounded-lg"
    >
      Skip to content
    </a>
  );

  return (
    <>
      {SkipLink}
      <motion.nav
        ref={navRef}
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 w-full z-[9999] transition
          px-[5vw] lg:px-[8vw] xl:px-[12vw]
          ${
            isScrolled
              ? "bg-[#050414]/60 backdrop-blur-md shadow-md"
              : "bg-transparent"
          }`}
        variants={navVariants}
        initial="initial"
        animate="show"
      >
        <div className="text-white py-4 md:py-5 flex justify-between items-center gap-8">
          {/* Logo/Brand */}
          <motion.button
            type="button"
            onClick={() => goTo(MENU[0].id)}
            className="text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[--accent] rounded whitespace-nowrap flex-shrink-0"
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            style={{ ["--accent"]: ACCENT }}
            aria-label={`Go to ${MENU[0].label}`}
          >
            <span style={{ color: ACCENT }}>&lt;</span>
            <span className="text-white">{BRAND.first}</span>
            <span style={{ color: ACCENT }}>/</span>
            <span className="text-white">{BRAND.last}</span>
            <span style={{ color: ACCENT }}>&gt;</span>
          </motion.button>

          {/* Desktop Menu */}
          <ul className="relative hidden lg:flex items-center gap-5 xl:gap-8 text-gray-300 text-sm xl:text-base">
            {MENU.map((m, i) => {
              const isActive = activeSection === m.id;
              return (
                <motion.li
                  key={m.id}
                  custom={i}
                  variants={itemVariants}
                  initial="initial"
                  animate="show"
                  className="relative"
                >
                  <motion.button
                    type="button"
                    onClick={() => goTo(m.id)}
                    className={`relative px-1 py-1 transition ${
                      isActive ? "text-[--accent]" : "hover:text-[--accent]"
                    } focus:outline-none focus:ring-2 focus:ring-[--accent] rounded`}
                    whileHover={reducedMotion ? undefined : { y: -1 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    aria-current={isActive ? "page" : undefined}
                    style={{ ["--accent"]: ACCENT }}
                  >
                    {m.label}
                    {/* HANYA render underline saat aktif
                        agar shared-layoutId benar2 berpindah */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-1 h-0.5 bg-[--accent] w-full"
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 28 }
                        }
                        style={{ ["--accent"]: ACCENT }}
                      />
                    )}
                  </motion.button>
                </motion.li>
              );
            })}

            {/* Socials */}
            <motion.li
              custom={MENU.length}
              variants={itemVariants}
              initial="initial"
              animate="show"
              className="flex items-center gap-4 ml-2"
            >
              <motion.a
                href="https://github.com/iqbalmusyaffa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[--accent] p-1 rounded focus:outline-none focus:ring-2 focus:ring-[--accent]"
                whileHover={reducedMotion ? undefined : { y: -1 }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                aria-label="GitHub"
                style={{ ["--accent"]: ACCENT }}
              >
                <FaGithub size={22} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/iqbalmusyaffa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[--accent] p-1 rounded focus:outline-none focus:ring-2 focus:ring-[--accent]"
                whileHover={reducedMotion ? undefined : { y: -1 }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                aria-label="LinkedIn"
                style={{ ["--accent"]: ACCENT }}
              >
                <FaLinkedin size={22} />
              </motion.a>
            </motion.li>
          </ul>

          {/* Mobile Toggle */}
          <div className="lg:hidden relative z-[10001]">
            <motion.button
              ref={toggleRef}
              type="button"
              onClick={() => setIsOpen((s) => !s)}
              className="text-3xl text-[--accent] focus:outline-none focus:ring-2 focus:ring-[--accent] rounded"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              whileTap={reducedMotion ? undefined : { scale: 0.9, rotate: 10 }}
              style={{ ["--accent"]: ACCENT }}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </motion.button>
          </div>
        </div>

      </motion.nav>

      {/* Mobile: backdrop + off-canvas panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}
              className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              key="panel"
              ref={mobilePanelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: reducedMotion ? 0 : 0.24,
                ease: "easeOut",
              }}
              className="
                fixed right-0 top-0 z-[10000] h-[100dvh] w-[82%] max-w-[360px]
                lg:hidden bg-[#0b0a1a]/95 border-l border-white/10
                backdrop-blur-xl shadow-2xl
                pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+16px)]
                flex flex-col
              "
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <div className="flex items-center justify-end px-5">
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  whileHover={reducedMotion ? undefined : { rotate: 90, scale: 1.08 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.92 }}
                  className="flex items-center justify-center w-10 h-10
                    rounded-full bg-[#1a1a2e]/70
                    text-[#a78bfa] hover:text-white
                    hover:bg-[--accent]/40
                    focus:outline-none focus:ring-2 focus:ring-[--accent]/50
                    shadow-[0_0_10px_rgba(130,69,236,0.4)]
                    backdrop-blur-md transition duration-300"
                  aria-label="Close menu"
                  style={{ ["--accent"]: ACCENT }}
                >
                  <FiX className="text-2xl" />
                </motion.button>
              </div>

              {/* Menu items */}
              <nav className="mt-2 px-5">
                <ul className="flex flex-col gap-2 text-gray-200">
                  {MENU.map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => goTo(m.id)}
                        className={`w-full text-left px-3 py-3 rounded-lg transition
                          hover:bg-white/5 active:bg-white/10
                          ${
                            activeSection === m.id
                              ? "text-[#a78bfa] bg-white/5"
                              : ""
                          }`}
                        aria-current={activeSection === m.id ? "page" : undefined}
                      >
                        {m.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Socials bottom */}
              <div className="mt-auto px-5">
                <div className="h-px w-full bg-white/10 my-3" />
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/iqbalmusyaffa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 ring-1 ring-white/10 text-gray-300 hover:text-white hover:ring-white/25"
                    aria-label="GitHub"
                  >
                    <FaGithub size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/iqbalmusyaffa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 ring-1 ring-white/10 text-gray-300 hover:text-white hover:ring-white/25"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={22} />
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
