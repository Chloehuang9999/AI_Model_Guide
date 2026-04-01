#!/usr/bin/env node
/**
 * Build 512×512 white-background square PNGs from local sources (no network).
 * Requires: npm install (sharp, simple-icons).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets/logos');
const SI_DIR = path.join(ROOT, 'node_modules/simple-icons/icons');
const SIZE = 512;
const PAD_RATIO = 0.12;

async function toWhiteSquare(buf, filename, { isSvg = false } = {}) {
  const maxSide = Math.round(SIZE * (1 - 2 * PAD_RATIO));
  let pipeline = sharp(buf, isSvg ? { density: 400 } : {});
  pipeline = pipeline.resize({
    width: maxSide,
    height: maxSide,
    fit: 'inside',
    withoutEnlargement: false,
  });
  const inner = await pipeline.ensureAlpha().png().toBuffer();
  const outPath = path.join(OUT_DIR, filename);
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile(outPath);
  console.log('wrote', outPath);
}

const jobs = [
  { out: 'openai.png', file: path.join(SI_DIR, 'openai.svg'), isSvg: true },
  { out: 'claude.png', file: path.join(SI_DIR, 'anthropic.svg'), isSvg: true },
  { out: 'gemini.png', file: path.join(SI_DIR, 'googlegemini.svg'), isSvg: true },
  { out: 'qwen.png', file: path.join(OUT_DIR, 'qwen.jpg'), isSvg: false },
  {
    out: 'kimi.png',
    file: path.join(OUT_DIR, 'sources/kimi-on-white.svg'),
    isSvg: true,
  },
  { out: 'deepseek.png', file: path.join(OUT_DIR, 'deepseek.jpg'), isSvg: false },
];

async function main() {
  if (!fs.existsSync(SI_DIR)) {
    console.error('Missing simple-icons. Run: npm install simple-icons');
    process.exit(1);
  }
  fs.mkdirSync(path.join(OUT_DIR, 'sources'), { recursive: true });

  for (const job of jobs) {
    if (!fs.existsSync(job.file)) {
      console.error('missing', job.file);
      process.exitCode = 1;
      continue;
    }
    const buf = fs.readFileSync(job.file);
    try {
      await toWhiteSquare(buf, job.out, { isSvg: !!job.isSvg });
    } catch (e) {
      console.error('fail', job.out, e.message);
      process.exitCode = 1;
    }
  }

  // 豆包：将官方 192 方形 favicon 存为 assets/logos/_doubao_src.png 后在此生成；已有 512×512 的 doubao.png 则跳过
  const doubaoSrc = path.join(OUT_DIR, '_doubao_src.png');
  const doubaoOut = path.join(OUT_DIR, 'doubao.png');
  if (fs.existsSync(doubaoOut)) {
    const meta = await sharp(doubaoOut).metadata();
    if (meta.width === SIZE && meta.height === SIZE) {
      console.log('keep', doubaoOut);
    }
  }
  if (fs.existsSync(doubaoSrc)) {
    await toWhiteSquare(fs.readFileSync(doubaoSrc), 'doubao.png', { isSvg: false });
  }
}

main();
