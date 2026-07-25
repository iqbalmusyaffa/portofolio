import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_axbtt7a",  // Replace with your EmailJS Service ID
        "template_1ziboq3",  // Replace with your EmailJS Template ID
        form.current,
        "Rz7W9pVF0HdDryNNL"  // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset(); // Reset form fields after sending
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]"
    >
      {/* Toast Container */}
      <ToastContainer />

      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#e879f9] to-[#a78bfa] animate-gradient-x">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          I’d love to hear from you—reach out for any opportunities or questions!
        </p>
      </div>

      {/* Contact Form */}
      <div className="mt-8 w-full max-w-md bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 relative z-10">
        <h3 className="text-2xl font-bold text-white text-center mb-6">
          Connect With Me <span className="ml-1">🚀</span>
        </h3>

        <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-5">
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3.5 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3.5 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full p-3.5 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            className="w-full p-3.5 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
          />
          
          {/* Send Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 mt-2 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(130,69,236,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
