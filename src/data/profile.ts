import heroDarkImage from "../assets/Profile.png";
import heroLightImage from "../assets/Profile.png";

export const profile = {
  firstName: "Wesam",
  lastName: "Awad",
  role: "Front-End Developer",
  greeting: "Hi – I'm Wesam",
  summary: "Crafting innovative solutions to solve real-world problems.",
  image: {
    light: heroLightImage,
    dark: heroDarkImage,
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
