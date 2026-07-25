// Skills Section Logo's
import htmlLogo from "./assets/tech_logo/html.png";
import cssLogo from "./assets/tech_logo/css.png";
import sassLogo from "./assets/tech_logo/sass.png";
import javascriptLogo from "./assets/tech_logo/javascript.png";
import reactjsLogo from "./assets/tech_logo/reactjs.png";
import laravelLogo from "./assets/tech_logo/laravel.png";
import tailwindcssLogo from "./assets/tech_logo/tailwindcss.png";
import bootstrapLogo from "./assets/tech_logo/bootstrap.png";
import nodejsLogo from "./assets/tech_logo/nodejs.png";
import expressjsLogo from "./assets/tech_logo/express.png";
import mysqlLogo from "./assets/tech_logo/mysql.png";
import firebaseLogo from "./assets/tech_logo/firebase.png";
import pythonLogo from "./assets/tech_logo/python.png";
import gitLogo from "./assets/tech_logo/git.png";
import githubLogo from "./assets/tech_logo/github.png";
import vscodeLogo from "./assets/tech_logo/vscode.png";
import postmanLogo from "./assets/tech_logo/postman.png";
import figmaLogo from "./assets/tech_logo/figma.png";
import vercelLogo from "./assets/tech_logo/vercel.png";
import nextjsLogo from "./assets/tech_logo/nextjs.svg";
import sqliteLogo from "./assets/tech_logo/sqlite.svg";

// Experience Section Logo's
import maxyLogo from "./assets/company_logo/maxy.png";
import pastijadiLogo from "./assets/company_logo/pastijadi2.jpg";

// Education Section Logo's
import telkomLogo from "./assets/education_logo/logotelkom.png";
import smanLogo from "./assets/education_logo/sman2.png";

// Project Section Logo's
import githubdetLogo from "./assets/work_logo/github_det.png";
import csprepLogo from "./assets/work_logo/cs_prep.png";
import movierecLogo from "./assets/work_logo/movie_rec.png";
import taskremLogo from "./assets/work_logo/task_rem.png";
import npmLogo from "./assets/work_logo/npm.png";
import webverLogo from "./assets/work_logo/web_dig.png";
import cmLogo from "./assets/work_logo/cm.png";
import imagesearchLogo from "./assets/work_logo/image_search.png";
import removebgLogo from "./assets/work_logo/remove_bg.png";
import { i } from "framer-motion/client";

export const SkillsInfo = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", logo: htmlLogo },
      { name: "CSS", logo: cssLogo },
      { name: "SASS", logo: sassLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "React JS", logo: reactjsLogo },
      { name: "Next JS", logo: nextjsLogo },
      { name: "Tailwind CSS", logo: tailwindcssLogo },
      { name: "Bootstrap", logo: bootstrapLogo },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node JS", logo: nodejsLogo },
      { name: "Express JS", logo: expressjsLogo },
      { name: "MySQL", logo: mysqlLogo },
      { name: "SQLite", logo: sqliteLogo },
      { name: "Laravel", logo: laravelLogo },
      { name: "Firebase", logo: firebaseLogo },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Python", logo: pythonLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "Laravel", logo: laravelLogo },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", logo: gitLogo },
      { name: "GitHub", logo: githubLogo },
      { name: "VS Code", logo: vscodeLogo },
      { name: "Postman", logo: postmanLogo },
      { name: "Vercel", logo: vercelLogo },
      { name: "Figma", logo: figmaLogo },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    img: maxyLogo,
    role: "Backend Developer (Bootcamp Project)",
    company: "PT. Linkdataku Solusi Indonesia (Maxy Academy)",
    date: "April 2024 - July 2024",
    desc: "Sebagai backend developer dalam program bootcamp Maxy Academy, saya berfokus pada pembangunan API yang kokoh dan skalabel untuk mendukung aplikasi koperasi Deus Code. Menggunakan framework populer seperti Node.js dan menerapkan arsitektur RESTful untuk memastikan integrasi frontend yang efisien.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "laravel",
      "Node JS",
      "MySQL",
      "Postman",
      "Git",
      "GitHub",
    ],
  },
  {
    id: 2,
    img: pastijadiLogo,
    role: "Full Stack Developer (Internship)",
    company: "PT PastiDjadi",
    date: "Juni 2024 - November 2024",
    desc: "Sebagai Full Stack Developer Intern, saya bertanggung jawab dalam pengembangan end-to-end aplikasi web, mulai dari pembuatan antarmuka pengguna yang responsif menggunakan HTML, CSS, JavaScript, dan Bootstrap, hingga pengelolaan logika backend dengan PHP dan Laravel.",
    skills: ["HTML", "CSS", "Javascript", "Bootstrap", "Git", "GitHub", "laravel","PHP"],
  },
];

export const education = [
  {
    id: 0,
    img: telkomLogo,
    school: "Universitas Telkom Surabaya",
    degree: "Sarjana S1 Sistem Informasi",
    date: "2021 - 2025",
    grade: "IPK: 3.4 / 4.0",
    desc: "Selama masa studi, saya terlibat dalam beberapa proyek pengembangan yang memperkuat keahlian saya. Saya berperan sebagai Back-End Developer untuk website 'Kampung Bebek', di mana saya menggunakan Laravel dan MySQL untuk membangun platform dan berhasil meningkatkan visibilitasnya melalui strategi SEO.",
    location: "Surabaya",
  },
  {
    id: 1,
    img: smanLogo,
    school: "SMA Negeri 2 Taruna Bhayangkara",
    degree: "SMA/Sederajat IPS",
    date: "2018 - 2021",
    grade: "IPK: 86.00",
    desc: "Menyelesaikan pendidikan menengah atas di jurusan Ilmu Pengetahuan Sosial dengan fokus pada disiplin, kepemimpinan, dan kerja sama tim melalui berbagai kegiatan sekolah.",
    location: "Banyuwangi",
  },
];
export const customDescriptions = {
  "portofolio": "Website portofolio interaktif yang dibangun menggunakan React dan Tailwind CSS. Terintegrasi dengan GitHub API untuk menampilkan proyek secara real-time dengan desain UI/UX modern.",
  "company-profile-aneka": "Aplikasi company profile profesional yang dikembangkan menggunakan arsitektur modern. Memiliki tampilan responsif dan performa tinggi untuk mendukung branding perusahaan.",
  "opensky-radar": "Sistem pelacakan dan monitoring radar interaktif. Proyek ini memproses dan memvisualisasikan data kompleks menjadi antarmuka yang mudah dipahami pengguna.",
  "websewamobil": "Platform penyewaan mobil digital (Rent Car) end-to-end yang memudahkan pelanggan melakukan pemesanan kendaraan dengan antarmuka yang bersih dan user-friendly.",
  "e-commerce-frontend": "Aplikasi antarmuka toko online (E-Commerce) yang modern. Dilengkapi dengan fitur keranjang belanja, katalog produk interaktif, dan pengalaman checkout yang mulus.",
  "e-commerce-backend": "Layanan backend API (RESTful) untuk mendukung operasional E-Commerce. Menangani manajemen pengguna, autentikasi, transaksi, dan integrasi database secara efisien."
};

export const customLiveUrls = {
  "company-profile-aneka": "https://anekajaya.my.id/",
  "portofolio": "https://iqbalmusyaffa.my.id/",
  "websewamobil": "https://autorent.iqbaldeveloper.my.id/",
  "e-commerce-frontend": "https://store.iqbaldeveloper.my.id/",
  "e-commerce-backend": "https://apistore.iqbaldeveloper.my.id/admin/login"
};

export const projects = [
  {
    id: 0,
    title: "GitHub Profile Detective",
    description:
      "A powerful and user-friendly React.js application designed to uncover and showcase detailed GitHub profile information. Simply enter a GitHub username, and the app fetches comprehensive data, including profile stats, repositories, followers, and contributions. The intuitive interface ensures a seamless experience, making it a must-visit tool for developers and recruiters.",
    image: githubdetLogo,
    tags: ["HTML", "CSS", "JavaScript", "React JS", "API"],
    github:
      "https://github.com/codingmastr/GitHub-Profile-Search-App-Using-React-JS",
    webapp: "https://githubprofiledetective.netlify.app/",
  },
  {
    id: 1,
    title: "CS Prep",
    description:
      "A full-stack quiz-based platform designed for GATE/UGC NET students to practice previous year questions and create customized tests. The platform offers comprehensive profile stats and detailed results, helping students track and improve their preparation journey effectively.",
    image: csprepLogo,
    tags: [
      "React JS",
      "Node.js",
      "MongoDB",
      "Express",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github: "https://github.com/codingmastr/CSPrep",
    webapp: "https://csprep.netlify.app/",
  },
  {
    id: 2,
    title: "Movie Recommendation App",
    description:
      "A React-based web application that provides movie recommendations based on different criteria, such as genres, user preferences, and popular trends. The intuitive design and smooth experience make it a go-to app for movie enthusiasts.",
    image: movierecLogo,
    tags: ["React JS", "API", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/codingmastr/Movie-Recommendation-App",
    webapp: "https://movie-recommendation-app-jet.vercel.app/",
  },
  {
    id: 3,
    title: "Email Validator NPM Package",
    description:
      "An efficient and customizable NPM package for validating email addresses. Built using React.js and Node.js, it provides robust validation features to help developers ensure that email inputs meet required formats and standards.",
    image: npmLogo,
    tags: ["React JS", "Node.js", "NPM", "Validation"],
    github: "https://github.com/codingmastr/cmtk-email-validator",
    webapp: "https://www.npmjs.com/package/cmtk-email-validator",
  },
  {
    id: 4,
    title: "Task Reminder Chrome Extension Tool",
    description:
      "A productivity-boosting Chrome extension designed to help users manage and remember their daily tasks. Built using JavaScript, it offers a simple interface with reminders and task notifications to keep users on track.",
    image: taskremLogo,
    tags: ["JavaScript", "Chrome Extension", "HTML", "CSS"],
    github: "https://github.com/codingmastr/Task-Reminder-Tool",
    webapp: "chrome://extensions/?id=kngheeibjnnidhfoomkpnbeghackheci",
  },
  {
    id: 5,
    title: "Webverse Digital",
    description:
      "The official website for Webverse Digital, a creative digital marketing agency. Built using HTML, CSS, and JavaScript, it features visually appealing animations and a clean design to showcase the agency's services.",
    image: webverLogo,
    tags: ["HTML", "CSS", "JavaScript", "Framer Motion"],
    github: "https://github.com/codingmastr/Webverse-Digital",
    webapp: "https://webversedigital.com/",
  },
  {
    id: 6,
    title: "Coding Master",
    description:
      "An ed-tech platform where users can access tech and coding-related blogs, notes, interview questions, e-books, and premium content with payment integration. Built with full-stack technologies for a seamless learning experience.",
    image: cmLogo,
    tags: ["React JS", "Node.js", "MongoDB", "Express", "Payment Integration"],
    github: "https://codingmasterweb.in/",
    webapp: "https://codingmasterweb.in/",
  },
  {
    id: 7,
    title: "Image Search App",
    description:
      "A React.js-based image search application that allows users to search and download high-quality images from the web. Built using external APIs to ensure a vast library of results for various queries.",
    image: imagesearchLogo,
    tags: ["React JS", "API", "Search Feature", "CSS", "Javascript"],
    github: "https://github.com/codingmastr/Image-Search-App",
    webapp: "https://imagsearch.netlify.app/",
  },
  {
    id: 8,
    title: "Image Background Remover",
    description:
      "An efficient background removal app built with React.js and API integration. Users can upload any image, remove the background, and download the transparent version for further use.",
    image: removebgLogo,
    tags: ["React JS", "API", "Image Processing", "HTML", "CSS", "Javascript"],
    github: "https://github.com/codingmastr/Image-Background-Remover",
    webapp: "https://removeyourbg.netlify.app/",
  },
];

export const certifications = [
  {
    id: 0,
    title: "Backend Developer (Bootcamp Project)",
    issuer: "PT. Linkdataku Solusi Indonesia (Maxy Academy)",
    date: "July 2024",
    image: "https://placehold.co/600x400/1a1a2e/8245ec?text=Sertifikat+1&font=montserrat",
    link: "#",
  },
  {
    id: 1,
    title: "Full Stack Developer (Internship)",
    issuer: "PT PastiDjadi",
    date: "November 2024",
    image: "https://placehold.co/600x400/1a1a2e/8245ec?text=Sertifikat+2&font=montserrat",
    link: "#",
  },
  {
    id: 2,
    title: "Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "Agustus 2023",
    image: "https://placehold.co/600x400/1a1a2e/8245ec?text=Sertifikat+3&font=montserrat",
    link: "#",
  },
  {
    id: 3,
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    date: "September 2023",
    image: "https://placehold.co/600x400/1a1a2e/8245ec?text=Sertifikat+4&font=montserrat",
    link: "#",
  },
];
