// scripts/build-images.mjs
// Usage: node scripts/build-images.mjs
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC  = 'assets/masters';
const OUT  = 'public/img';

const WIDTHS = {
  catalogue:  [800, 1200, 1600],
  categories: [600, 900, 1200],
  firms:      [700, 1000, 1400],
  hero:       [1280, 1920, 2560],
  qc:         [600, 900, 1200],
  offices:    [800, 1200, 1600],
  social:     [1200],
};

const FORMATS = [
  ['avif', { quality: 55, effort: 4 }],
  ['webp', { quality: 78 }],
  ['jpg',  { quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' }],
];

for (const group of await readdir(SRC)) {
  const widths = WIDTHS[group];
  if (!widths) { console.warn(`skip unknown group: ${group}`); continue; }

  await mkdir(join(OUT, group), { recursive: true });
  const manifest = {};

  for (const file of await readdir(join(SRC, group))) {
    if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) continue;
    const { name } = parse(file);
    const input = join(SRC, group, file);
    const meta = await sharp(input).metadata();

    for (const w of widths) {
      for (const [fmt, opts] of FORMATS) {
        const ext = fmt === 'jpg' ? 'jpeg' : fmt;
        await sharp(input)
          .resize({ width: w, withoutEnlargement: true })
          .toFormat(ext, opts)
          .toFile(join(OUT, group, `${name}-${w}.${fmt}`));
      }
    }

    // LQIP: 20px wide blurred WebP as a data URI
    const lqip = await sharp(input)
      .resize({ width: 20 })
      .blur(1.2)
      .webp({ quality: 20 })
      .toBuffer();

    manifest[name] = {
      widths,
      aspect: `${meta.width} / ${meta.height}`,
      lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
    };
    console.log(`built ${group}/${name}`);
  }

  await writeFile(
    join(OUT, group, '_manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

console.log('Finished building all derivative image formats, widths, and manifests!');
