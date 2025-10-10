import React, { useEffect, useMemo, useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FiMail} from "react-icons/fi";
import profileImage from "../../assets/foto2.jpg";

const ACCENT = "#8245ec";
const EMAIL = "iqbalmusyaffa122@gmail.com"; 

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!m.matches);
    update();
    m.addEventListener?.("change", update);
    return () => m.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export default function About() {
  const reduced = useReducedMotion();

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
      transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: reduced ? 0 : 0.05 },
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
      // feedback sederhana tanpa lib
      const el = document.createElement("div");
      el.textContent = "Email copied!";
      el.style.cssText =
        "position:fixed;z-index:99999;bottom:18px;left:50%;transform:translateX(-50%);" +
        "background:#111827;color:white;padding:8px 14px;border-radius:999px;" +
        "box-shadow:0 6px 20px rgba(0,0,0,.25);font-size:14px";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    } catch (e) {
      alert(EMAIL);
    }
  };

  return (
    <section
      id="about"
      className="relative w-full bg-transparent mt-6 md:mt-12 lg:mt-16 scroll-mt-24"
      aria-labelledby="about-heading"
    >
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
            <motion.h1
              id="about-heading"
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
            >
              Halo, I am
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-1 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#8245ec] via-violet-400 to-white bg-clip-text text-transparent"
            >
              Iqbal Musyaffa YusaBbih Lillah
            </motion.p>

            <motion.div
              variants={item}
              className="mt-3 md:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight"
            >
              <span className="text-white">I am a </span>
              {reduced ? (
                <span className="text-[#a78bfa] align-middle">Fullstack Developer</span>
              ) : (
                <span className="align-middle">
                  <ReactTypingEffect
                    text={["Fullstack Developer", "Front-End Developer", "Back-End Developer", "Mobile Developer"]}
                    speed={100}
                    eraseSpeed={50}
                    typingDelay={500}
                    eraseDelay={1800}
                    cursorRenderer={(cursor) => <span className="text-[#8245ec]">{cursor}</span>}
                    displayTextRenderer={(text) => <span className="text-[#a78bfa]">{text}</span>}
                  />
                </span>
              )}
            </motion.div>

            <motion.p
              variants={item}
              className="mt-4 md:mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              Saya fresh graduate Telkom University Surabaya dengan minat besar pada
              pengembangan website. Aktif di CODER IT Telkom Surabaya (workshop & kepanitiaan),
              pernah menjabat Sekretaris Divisi Mobile Developer. Berpengalaman membangun
              aplikasi dengan Laravel & React, dan terus belajar untuk memberikan dampak
              nyata pada proyek dan tim.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start"
            >
              <a
                href="https://drive.google.com/drive/folders/1Pot8GeUM6s_4J7n_8VlcULaMaycx1sD4?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-base md:text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8245ec] focus:ring-offset-transparent transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                style={{
                  background: "linear-gradient(90deg, #8245ec, #a855f7)",
                  boxShadow: "0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 36px rgba(130,69,236,0.5)",
                }}
                aria-label="Download CV of Iqbal Musyaffa"
              >
                DOWNLOAD CV
              </a>

              <button
                onClick={() => (window.location.href = `mailto:${EMAIL}`)}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm md:text-base font-semibold text-white/90 ring-1 ring-white/15 hover:ring-white/25 hover:text-white transition"
              >
                <FiMail className="text-lg" />
                Email Me
              </button>
            </motion.div>

          </motion.div>

          {/* Right: Photo */}
          <motion.div
            {...motionBlock}
            transition={{ ...(motionBlock.transition || {}), delay: reduced ? 0 : 0.1 }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <Tilt
              className="w-44 h-44 sm:w-60 sm:h-60 md:w-[26rem] md:h-[26rem]"
              tiltMaxAngleX={reduced ? 0 : 18}
              tiltMaxAngleY={reduced ? 0 : 18}
              perspective={1100}
              scale={reduced ? 1 : 1.04}
              transitionSpeed={900}
              gyroscope={!reduced}
            >
              <div className="relative w-full h-full rounded-full">
                {/* Gradient halo */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-1 sm:-inset-1.5 rounded-full blur-md opacity-70"
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
                  loading="lazy"
                  className="relative w-full h-full rounded-full object-cover shadow-2xl"
                  onError={(e) => (e.currentTarget.alt = "Foto profil tidak tersedia")}
                />

                {/* Inner glow */}
                <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_10px_30px_rgba(130,69,236,0.35)]" />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
