import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MENU = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "education", label: "Education" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  const navRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const toggleRef = useRef(null);

  // Hitung tinggi nav untuk offset scroll
  useLayoutEffect(() => {
    const update = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight || 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Background saat scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight menu aktif pakai IntersectionObserver
  useEffect(() => {
    const sections = MENU.map((m) => document.getElementById(m.id)).filter(Boolean);
    if (!sections.length) return;

    const topOffset = navHeight + 8; // ruang kecil di bawah nav
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4, rootMargin: `-${topOffset}px 0px -50% 0px` }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [navHeight]);

  // Smooth scroll dengan kompensasi nav
  const goTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - (navHeight + 8);
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Tutup menu: ESC / klik di luar (abaikan klik pada toggle & panel)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
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

  // Lock body scroll saat menu terbuka
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : original || "";
    return () => (document.body.style.overflow = original);
  }, [isOpen]);

  // Motion variants
  const navVariants = {
    initial: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  };
  const itemVariants = {
    initial: { y: 10, opacity: 0 },
    show: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.05 * i, duration: 0.25, ease: "easeOut" },
    }),
  };

  return (
    <motion.nav
      ref={navRef}
      role="navigation"
      aria-label="Main Navigation"
      className={`fixed top-0 w-full z-[9999] overflow-visible transition px-[7vw] md:px-[7vw] lg:px-[20vw] ${
        isScrolled ? "bg-[#050414]/60 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      variants={navVariants}
      initial="initial"
      animate="show"
    >
      <div className="text-white py-4 md:py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.button
          type="button"
          onClick={() => goTo("about")}
          className="text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#8245ec] rounded"
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-white">Iqbal</span>
          <span className="text-[#8245ec]">/</span>
          <span className="text-white">Musyaffa</span>
          <span className="text-[#8245ec]">&gt;</span>
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
                className={`relative px-1 py-1 transition ${
                  activeSection === m.id ? "text-[#8245ec]" : "hover:text-[#8245ec]"
                } focus:outline-none focus:ring-2 focus:ring-[#8245ec] rounded`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-current={activeSection === m.id ? "page" : undefined}
              >
                {m.label}
                {/* underline anim */}
                <motion.span
                  layoutId="underline"
                  className={`absolute left-0 -bottom-1 h-0.5 bg-[#8245ec] ${
                    activeSection === m.id ? "w-full" : "w-0"
                  }`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
              href="https://github.com/codingmastr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8245ec] p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/tarun-kaushik-553b441a4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8245ec] p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </motion.a>
          </motion.li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden relative z-[10001] pointer-events-auto">
          <motion.button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((s) => !s)}
            className="text-3xl text-[#8245ec] focus:outline-none focus:ring-2 focus:ring-[#8245ec] rounded"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.9, rotate: 10 }}
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
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Panel */}
            <motion.aside
              key="panel"
              ref={mobilePanelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.24, ease: "easeOut" }}
              className="
                fixed right-0 top-0 z-[10000] h-[100dvh] w-[82%] max-w-[360px]
                md:hidden bg-[#0b0a1a]/95 border-l border-white/10
                backdrop-blur-xl shadow-2xl
                pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+16px)]
                flex flex-col
              "
              id="mobile-menu"
            >
              {/* Close inside panel */}
              <div className="flex items-center justify-between px-5">
                <span className="sr-only">Navigation</span>
  <motion.button
  type="button"
  onClick={() => setIsOpen(false)}
  whileHover={{ rotate: 90, scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="ml-auto flex items-center justify-center w-10 h-10
             rounded-full bg-[#1a1a2e]/70
             text-[#a78bfa] hover:text-white
             hover:bg-[#8245ec]/40
             focus:outline-none focus:ring-2 focus:ring-[#8245ec]/50
             shadow-[0_0_10px_rgba(130,69,236,0.4)]
             backdrop-blur-md transition duration-300"
  aria-label="Close menu"
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
                          ${activeSection === m.id ? "text-[#a78bfa] bg-white/5" : ""}
                        `}
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
                    href="https://github.com/codingmastr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 ring-1 ring-white/10 text-gray-300 hover:text-white hover:ring-white/25"
                    aria-label="GitHub"
                  >
                    <FaGithub size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tarun-kaushik-553b441a4"
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
  );
}
