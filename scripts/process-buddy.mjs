// Processes Buddy.png + any Buddy-<State>.* source images into clean, app-ready
// variants in public/buddy/:
//   - buddy-transparent.webp / buddy-square-512.webp   base mascot, bg removed
//   - buddy-full.webp                                  original optimized (bg kept)
//   - buddy-circle-{512,192}.png                       circular-masked avatars
//   - buddy-<state>.webp                               one per emotion source, bg removed
//
// Emotion sources (e.g. Buddy-happy.webp) are detected automatically, processed
// to real WebP at 512px with the cream background removed, and the originals are
// moved to public/buddy/raw/ for preservation.
//
// Run: node scripts/process-buddy.mjs

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'Buddy.png';
const OUT = 'public/buddy';
const RAW = path.join(OUT, 'raw');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(RAW, { recursive: true });

const BG = [253, 252, 250]; // sampled cream/near-white background
const TOL = 30;             // within this color distance → fully transparent
const FEATHER = 16;         // feather band for soft anti-aliased edges

// Remove the background from an image buffer, returning a transparent RGBA buffer.
async function removeBackground(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const dist = Math.sqrt((r - BG[0]) ** 2 + (g - BG[1]) ** 2 + (b - BG[2]) ** 2);
    if (dist < TOL) data[i + 3] = 0;
    else if (dist < TOL + FEATHER) data[i + 3] = Math.round(255 * (dist - TOL) / FEATHER);
  }
  return sharp(Buffer.from(data), { raw: { width: info.width, height: info.height, channels: 4 } });
}

console.log('Processing base mascot…');

// Base — transparent. Prefer a user-provided transparent image (real alpha,
// cleaner edges) over chroma-keying Buddy.png.
async function hasAlpha(p) {
  try { const m = await sharp(p).metadata(); return m.hasAlpha; } catch { return false; }
}
const USER_TRANSPARENT = `${OUT}/buddy-transparent.webp`;
let transparentPipeline;
if (fs.existsSync(USER_TRANSPARENT) && await hasAlpha(USER_TRANSPARENT)) {
  console.log('  (using your provided transparent base — real alpha, skipping chroma key)');
  transparentPipeline = sharp(fs.readFileSync(USER_TRANSPARENT)); // buffer to avoid same-file R/W
} else {
  transparentPipeline = await removeBackground(SRC);
}
await transparentPipeline.clone()
  .resize(512, 512, { fit: 'cover', position: 'center' })
  .webp({ quality: 92 })
  .toFile(`${OUT}/buddy-square-512.webp`);
console.log('  ✓ buddy-square-512.webp');

// 4. Emotion variants — process any Buddy-<state>.* sources.
//    Scans public/buddy/ first, then public/buddy/raw/ (so re-runs still find them
//    after the first run moves sources into raw/). Case-sensitive capital-B
//    "Buddy-" so we never match the lowercase generated variants.
function findEmotionSources() {
  const re = /^Buddy-(.+)\.(webp|png|jpg|jpeg)$/; // case-sensitive
  const found = [];
  for (const dir of [OUT, RAW]) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      const m = f.match(re);
      if (m) found.push({ dir, file: f, state: m[1].toLowerCase() });
    }
  }
  // De-dup: prefer a copy still in OUT over one already in RAW.
  const seen = new Set();
  return found.filter(({ state }) => (seen.has(state) ? false : (seen.add(state), true)));
}

const emotionSources = findEmotionSources();

if (emotionSources.length) {
  console.log(`\nProcessing ${emotionSources.length} emotion variants…`);
  for (const { dir, file, state } of emotionSources) {
    const srcPath = path.join(dir, file);
    try {
      const transparent = await removeBackground(srcPath);
      await transparent.clone()
        .resize(512, 512, { fit: 'cover', position: 'center' })
        .webp({ quality: 92 })
        .toFile(`${OUT}/buddy-${state}.webp`);
      // Preserve the original source out of the served root (idempotent if already there).
      const dest = path.join(RAW, file);
      if (srcPath !== dest) {
        fs.renameSync(srcPath, dest);
      }
      console.log(`  ✓ buddy-${state}.webp  (from ${file})`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }
} else {
  console.log('\nNo Buddy-<state>.* emotion sources found — skipping emotion variants.');
}

console.log('\nDone. Variants in public/buddy/, originals in public/buddy/raw/.');
