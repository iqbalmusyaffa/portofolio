import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import profileImage from "../../assets/foto2.jpg";
import MagneticButton from "../MagneticButton/MagneticButton";

// ✅ Lazy-load libraries
const ReactTypingEffect = lazy(() => import("react-typing-effect"));
const Tilt = lazy(() => import("react-parallax-tilt"));

const ACCENT = "#8245ec";
const EMAIL = "iqbalmusyaffa122@gmail.com";

/* ===== prefers-reduced-motion (custom) ===== */
function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!m.matches);
    update();
    m.addEventListener?.("change", update);
    return () => m.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export default function About() {
  const reduced = useReducedMotionPref();

  const motionBlock = useMemo(
    () =>
      reduced
        ? { initial: false, whileInView: undefined, transition: { duration: 0 } }
        : {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.3 },
            transition: { duration: 0.6, ease: "easeOut" },
          },
    [reduced]
  );

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.35, ease: "easeOut" },
    },
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      // announce untuk screen reader
      const live = document.getElementById("sr-live");
      if (live) live.textContent = "Email copied to clipboard";
      // toast kecil visual
      const el = document.createElement("div");
      el.textContent = "Email copied!";
      el.style.cssText =
        "position:fixed;z-index:99999;bottom:18px;left:50%;transform:translateX(-50%);" +
        "background:#111827;color:white;padding:8px 14px;border-radius:999px;" +
        "box-shadow:0 6px 20px rgba(0,0,0,.25);font-size:14px";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    } catch {
      alert(EMAIL);
    }
  };

  return (
    <section
      id="about"
      className="relative w-full bg-transparent mt-6 md:mt-12 lg:mt-16 scroll-mt-24"
      aria-labelledby="about-heading"
    >
      {/* live region untuk feedback non-intrusif */}
      <span id="sr-live" className="sr-only" aria-live="polite" />

      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-24 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            className="order-2 md:order-1 text-center md:text-left"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Pakai h1 tunggal untuk SEO/aksesibilitas */}
            <motion.h1
              id="about-heading"
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight tracking-tight"
            >
              Halo, saya
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-1 text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#8245ec] via-violet-400 to-white bg-clip-text text-transparent"
            >
              Iqbal Musyaffa.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-3 md:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight"
            >
              <span className="text-white">Seorang </span>
              {reduced ? (
                <span className="text-[#a78bfa] align-middle font-heading">
                  Software Engineer
                </span>
              ) : (
                <Suspense
                  fallback={
                    <span className="text-[#a78bfa] align-middle font-heading">
                      Software Engineer
                    </span>
                  }
                >
                  <span className="align-middle font-heading inline-block min-w-[220px] md:min-w-[280px] text-left">
                    <ReactTypingEffect
                      text={[
                        "Software Engineer",
                        "Fullstack Developer",
                        "Problem Solver"
                      ]}
                      speed={100}
                      eraseSpeed={50}
                      typingDelay={500}
                      eraseDelay={1800}
                      cursorRenderer={(cursor) => (
                        <span className="text-[#8245ec]">{cursor}</span>
                      )}
                      displayTextRenderer={(text) => (
                        <span className="text-[#a78bfa]">{text}</span>
                      )}
                    />
                  </span>
                </Suspense>
              )}
            </motion.div>

            <motion.p
              variants={item}
              className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              Lulusan Universitas Telkom Surabaya yang senang menerjemahkan ide menjadi 
              antarmuka web yang bersih dan efisien. Berpengalaman membangun aplikasi 
              dengan ekosistem <strong>Laravel</strong> &amp; <strong>React</strong>. 
              Fokus utama saya bukan sekadar menulis kode, tapi memberikan dampak 
              nyata bagi pengguna dan tim.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-col sm:flex-row flex-wrap items-center gap-4 sm:gap-3 justify-center md:justify-start w-full"
            >
              <MagneticButton>
                <a
                  href="https://drive.google.com/drive/folders/1Pot8GeUM6s_4J7n_8VlcULaMaycx1sD4?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 sm:px-7 py-3 sm:py-3 text-base md:text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8245ec] focus:ring-offset-transparent transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                  style={{
                    background: "linear-gradient(90deg, #8245ec, #a855f7)",
                    boxShadow:
                      "0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 36px rgba(130,69,236,0.5)",
                  }}
                  aria-label="Download CV of Iqbal Musyaffa"
                >
                  DOWNLOAD CV
                </a>
              </MagneticButton>

              {/* gunakan <a> agar bisa ctrl/cmd+click, tidak memaksa window.location */}
              <MagneticButton>
                <a
                  href={`mailto:${EMAIL}`}
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 rounded-full px-6 sm:px-5 py-3 sm:py-2.5 text-base font-semibold text-white/90 ring-1 ring-white/15 hover:ring-white/25 hover:text-white transition"
                >
                  <FiMail className="text-lg" />
                  Email Me
                </a>
              </MagneticButton>

              {/* tombol copy email terpisah (opsional) */}
              <MagneticButton>
                <button
                  onClick={copyEmail}
                  className="w-full sm:w-auto justify-center inline-flex items-center rounded-full px-6 sm:px-4 py-3 sm:py-2.5 text-base sm:text-sm font-semibold text-white/90 ring-1 ring-white/10 hover:ring-white/25 hover:text-white transition"
                  aria-label="Copy email to clipboard"
                >
                  Copy Email
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            {...motionBlock}
            transition={{ ...(motionBlock.transition || {}), delay: reduced ? 0 : 0.1 }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <Suspense
              fallback={
                <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-[26rem] md:h-[26rem] rounded-full bg-white/5 animate-pulse" />
              }
            >
              <motion.div
                animate={reduced ? {} : { y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Tilt
                  className="w-44 h-44 sm:w-56 sm:h-56 md:w-[26rem] md:h-[26rem]"
                  tiltMaxAngleX={reduced ? 0 : 18}
                tiltMaxAngleY={reduced ? 0 : 18}
                perspective={1100}
                scale={reduced ? 1 : 1.04}
                transitionSpeed={900}
                gyroscope={!reduced}
              >
                <div className="relative w-full h-full rounded-full" style={{ aspectRatio: "1 / 1" }}>
                  {/* Gradient halo (lebih redup saat reduced) */}
                  <div
                    aria-hidden="true"
                    className={`absolute -inset-1 sm:-inset-1.5 rounded-full blur-md ${
                      reduced ? "opacity-40" : "opacity-70"
                    }`}
                    style={{
                      background:
                        "conic-gradient(from 180deg at 50% 50%, rgba(130,69,236,0.65), rgba(168,85,247,0.35), rgba(255,255,255,0.15), rgba(130,69,236,0.65))",
                      maskImage:
                        "radial-gradient(circle at center, transparent 58%, black 60%)",
                      WebkitMaskImage:
                        "radial-gradient(circle at center, transparent 58%, black 60%)",
                    }}
                  />
                  {/* Glass ring */}
                  <div className="absolute inset-0 rounded-full ring-2 sm:ring-4 ring-[#8245ec]/80" />

                  <img
                    src={profileImage}
                    alt="Foto profil Iqbal Musyaffa YusaBbih Lillah"
                    fetchpriority="high"
                    loading="eager"
                    decoding="async"
                    className="relative w-full h-full rounded-full object-cover shadow-2xl"
                    sizes="(max-width: 640px) 10rem, (max-width: 768px) 14rem, 26rem"
                    onError={(e) => (e.currentTarget.alt = "Foto profil tidak tersedia")}
                  />

                  {/* Inner glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(130,69,236,0.3)]" />
                </div>
              </Tilt>
              </motion.div>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
