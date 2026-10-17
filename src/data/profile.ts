export const profile = {
  firstName: "Wesam",
  lastName: "Awad",
  role: "Front-End Developer",
  greeting: "Hi – I'm Wesam",
  summary: "Crafting innovative solutions to solve real-world problems.",
  image: {
    /** Stable public URL so LCP can be preloaded from index.html */
    src: "/profile-800.webp",
    srcSet: "/profile-640.webp 640w, /profile-800.webp 800w, /profile.webp 1024w",
    /** Matches max-w-md / max-w-lg so the browser doesn't overestimate and pick 1024w on mobile */
    sizes: "(max-width: 768px) min(100vw, 28rem), 32rem",
    alt: "Wesam Awad, Front-End Developer",
  },
  ctas: {
    primary: { label: "View My Work", href: "#projects" },
    secondary: {
      label: "Download CV",
      href: "/WESAM%20AWAD.pdf",
      download: true,
    },
  },
  social: {
    github: "https://github.com/wesamawad",
    linkedin: "https://www.linkedin.com/in/wesamawad",
    email: "wesam.awad999@gmail.com",
    emailHref: "https://mail.google.com/mail/?view=cm&fs=1&to=wesam.awad999@gmail.com",
    /** Digits only, no + or spaces — used with https://wa.me/ */
    whatsapp: "970597151826",
  },
} as const;
