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

/* ================== Config ================== */
const MENU = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "education", label: "Education" },
];
const BRAND = { first: "Iqbal", last: "Musyaffa" };
const ACCENT = "#8245ec";

/* ======= Utility: prefers-reduced-motion ======= */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(m.matches);
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
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newH = Math.ceil(entry.contentRect.height);
        setH(newH);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return h;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const toggleRef = useRef(null);
  const firstFocusableRef = useRef(null); // untuk trap fokus
  const lastFocusableRef = useRef(null);

  const navHeight = useElementHeight(navRef);
  const reducedMotion = useReducedMotion();

  /* ======= Scroll background toggle ======= */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ======= Active section highlight (IntersectionObserver) ======= */
  useEffect(() => {
    const sections = MENU.map((m) => document.getElementById(m.id)).filter(
      Boolean
    );
    if (!sections.length) return;

    // Root margin: kompensasi tinggi nav, + ruang bawah agar highlight tidak “telat”
    const topOffset = navHeight + 12;
    const bottomOffset = Math.max(window.innerHeight * 0.4, 240);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      {
        threshold: 0.4,
        root: null,
        rootMargin: `-${topOffset}px 0px -${bottomOffset}px 0px`,
      }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [navHeight]);

  /* ======= Smooth scroll dengan kompensasi nav ======= */
  const goTo = useCallback(
    (id) => {
      setIsOpen(false);
      const el = document.getElementById(id);
      if (!el) return;
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - (navHeight + 10);
      window.scrollTo({
        top,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [navHeight, reducedMotion]
  );

  /* ======= ESC & klik di luar untuk menutup ======= */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
      // Trap focus saat panel terbuka
      if (isOpen && e.key === "Tab") {
        const panel = mobilePanelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const f = Array.from(focusables).filter(
          (el) =>
            !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    const onPointerDown = (e) => {
      if (!isOpen) return;
      const target = e.target;
      if (toggleRef.current?.contains(target)) return;
      if (mobilePanelRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  /* ======= Lock body scroll saat mobile menu terbuka ======= */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : original || "";
    return () => (document.body.style.overflow = original);
  }, [isOpen]);

  /* ======= Framer Motion variants ======= */
  const navVariants = useMemo(
    () => ({
      initial: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: reducedMotion ? 0 : 0.35, ease: "easeOut" },
      },
    }),
    [reducedMotion]
  );

  const itemVariants = useMemo(
    () => ({
      initial: { y: 10, opacity: 0 },
      show: (i) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: reducedMotion ? 0 : 0.05 * i,
          duration: reducedMotion ? 0 : 0.25,
          ease: "easeOut",
        },
      }),
    }),
    [reducedMotion]
  );

  /* ======= Skip link untuk aksesibilitas ======= */
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
        className={`fixed top-0 w-full z-[9999] overflow-visible transition
          px-[7vw] md:px-[7vw] lg:px-[20vw]
          ${
            isScrolled
              ? "bg-[#050414]/60 backdrop-blur-md shadow-md"
              : "bg-transparent"
          }
        `}
        variants={navVariants}
        initial="initial"
        animate="show"
      >
        <div className="text-white py-4 md:py-5 flex justify-between items-center">
          {/* Logo/Brand */}
          <motion.button
            type="button"
            onClick={() => goTo("about")}
            className="text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[--accent] rounded"
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            style={{ ["--accent"]: ACCENT }}
            aria-label="Go to About"
          >
            <span style={{ color: ACCENT }}>&lt;</span>
            <span className="text-white">{BRAND.first}</span>
            <span style={{ color: ACCENT }}>/</span>
            <span className="text-white">{BRAND.last}</span>
            <span style={{ color: ACCENT }}>&gt;</span>
          </motion.button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-gray-300">
            {MENU.map((m, i) => (
              <motion.li
                key={m.id}
                custom={i}
                variants={itemVariants}
                initial="initial"
                animate="show"
              >
                <motion.button
                  type="button"
                  onClick={() => goTo(m.id)}
                  className={`relative px-1 py-1 transition
                    ${
                      activeSection === m.id
                        ? "text-[--accent]"
                        : "hover:text-[--accent]"
                    }
                    focus:outline-none focus:ring-2 focus:ring-[--accent] rounded
                  `}
                  whileHover={reducedMotion ? undefined : { y: -1 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  aria-current={activeSection === m.id ? "page" : undefined}
                  style={{ ["--accent"]: ACCENT }}
                >
                  {m.label}
                  {/* underline anim */}
                  <motion.span
                    layoutId="underline"
                    className={`absolute left-0 -bottom-1 h-0.5 bg-[--accent] ${
                      activeSection === m.id ? "w-full" : "w-0"
                    }`}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 30 }
                    }
                    style={{ ["--accent"]: ACCENT }}
                  />
                </motion.button>
              </motion.li>
            ))}

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
          <div
            className={`md:hidden relative z-[10001] pointer-events-auto
    ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-hidden={isOpen}
          >
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

        {/* Mobile: backdrop + off-canvas panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.18 }}
                className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              {/* Panel */}
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
                  md:hidden bg-[#0b0a1a]/95 border-l border-white/10
                  backdrop-blur-xl shadow-2xl
                  pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+16px)]
                  flex flex-col
                "
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
              >
                {/* Close inside panel */}
                <div className="flex items-center justify-between px-5">
                  <span className="sr-only">Navigation</span>
                  <motion.button
                    ref={firstFocusableRef}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    whileHover={
                      reducedMotion ? undefined : { rotate: 90, scale: 1.08 }
                    }
                    whileTap={reducedMotion ? undefined : { scale: 0.92 }}
                    className="ml-auto flex items-center justify-center w-10 h-10
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
                    {MENU.map((m, idx) => (
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
                            }
                          `}
                          // mark last focusable rough guess (last item -> then socials buttons)
                          ref={
                            idx === MENU.length - 1
                              ? lastFocusableRef
                              : undefined
                          }
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
      </motion.nav>
    </>
  );
}
