import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const FRAME = 520;
const PAD = 28;
const INNER = FRAME - PAD * 2;
const PHOTO = INNER - 40;
const LEFT = 80;
const TOP = Math.round((HEIGHT - FRAME) / 2);

const portrait = await sharp("public/profile.webp")
  .resize(PHOTO, PHOTO, { fit: "inside" })
  .png()
  .toBuffer();

const photo = await sharp({
  create: {
    width: INNER,
    height: INNER,
    channels: 4,
    background: { r: 11, g: 15, b: 20, alpha: 1 },
  },
})
  .composite([{ input: portrait, gravity: "centre" }])
  .png()
  .toBuffer();

const overlay = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0f14"/>
      <stop offset="100%" stop-color="#121820"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="1040" cy="80" r="160" fill="#3ddc97" fill-opacity="0.08"/>
  <circle cx="1120" cy="560" r="200" fill="#3ddc97" fill-opacity="0.06"/>
  <rect x="${LEFT}" y="${TOP}" width="${FRAME}" height="${FRAME}" rx="28" fill="#121820" stroke="#3ddc97" stroke-opacity="0.35" stroke-width="3"/>
  <text x="640" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="58" font-weight="700" fill="#e8eef5">Wesam Awad</text>
  <text x="640" y="310" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="#3ddc97">Front-End Developer</text>
  <text x="640" y="365" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#9aa8b8">React · TypeScript · Tailwind CSS</text>
  <text x="640" y="440" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#9aa8b8">wesam-awad.vercel.app</text>
</svg>
`);

await sharp(overlay)
  .composite([{ input: photo, left: LEFT + PAD, top: TOP + PAD }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/og-image.jpg");

const meta = await sharp("public/og-image.jpg").metadata();
console.log(`Wrote public/og-image.jpg (${meta.width}x${meta.height})`);
