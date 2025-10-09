import React from "react";
import ReactTypingEffect from "react-typing-effect";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import profileImage from "../../assets/foto2.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-transparent mt-4 md:mt-10 lg:mt-12 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-24 py-8 md:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            className="order-2 md:order-1 text-center md:text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Halo, I am
            </h1>

            <p className="mt-1 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#8245ec] via-violet-400 to-white bg-clip-text text-transparent">
              Iqbal Musyaffa YusaBbih Lillah
            </p>

            <div className="mt-3 md:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
              <span className="text-white">I am a </span>
              <span className="align-middle">
                <ReactTypingEffect
                  text={["Fullstack Developer", "App Developer", "UI/UX Designer", "Coder"]}
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
            </div>

            <p className="mt-4 md:mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-prose mx-auto md:mx-0">
             Saya adalah fresh graduate dari Telkom University Surabaya yang memiliki ketertarikan besar di bidang pengembangan website. Selama masa kuliah, Saya juga berperan aktif dalam organisasi CODER IT Telkom Surabaya, dengan pengalaman mengikuti berbagai workshop serta terlibat dalam sejumlah kepanitiaan. Selain itu, saya pernah menjabat sebagai Sekretaris Divisi Mobile Developer selama satu periode. Saya memiliki pengalaman dalam membangun aplikasi website menggunakan Laravel framework dan React, serta berkomitmen untuk terus belajar dan berkontribusi positif dalam setiap proyek maupun tim yang saya ikuti.
            </p>

            <div className="mt-6">
              <a
                href="https://drive.google.com/file/d/1_pLl2wjYVCU-wnqXIhjhYr0YC0SJXvwv/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-base md:text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8245ec] focus:ring-offset-transparent transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  background: "linear-gradient(90deg, #8245ec, #a855f7)",
                  boxShadow:
                    "0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px rgba(130,69,236,0.6)",
                }}
                aria-label="Download CV of Iqbal Musyaffa"
              >
                DOWNLOAD CV
              </a>
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <Tilt
              className="w-44 h-44 sm:w-60 sm:h-60 md:w-[26rem] md:h-[26rem]"
              tiltMaxAngleX={18}
              tiltMaxAngleY={18}
              perspective={1100}
              scale={1.04}
              transitionSpeed={900}
              gyroscope={true}
            >
              <div className="relative w-full h-full rounded-full ring-2 sm:ring-4 ring-[#8245ec]/80">
                <img
                  src={profileImage}
                  alt="Foto profil Iqbal Musyaffa YusaBbih Lillah"
                  loading="lazy"
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                />
                <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_10px_30px_rgba(130,69,236,0.4)]" />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}