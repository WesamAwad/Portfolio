export const performanceContent = {
  title: "Performance",
  summary: "Lighthouse 100 — Performance, Accessibility, Best Practices & SEO.",
  imageAlt:
    "Lighthouse performance panel showing 100 scores for Performance, Accessibility, Best Practices, and SEO",
  verifyLabel: "Verify on PageSpeed Insights",
  verifyUrl: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwesam-awad.vercel.app%2F&form_factor=desktop",
  scores: [
    { label: "Performance", value: 100 },
    { label: "Accessibility", value: 100 },
    { label: "Best Practices", value: 100 },
    { label: "SEO", value: 100 },
  ],
} as const;
