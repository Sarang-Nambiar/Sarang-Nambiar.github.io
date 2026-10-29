// Resizes originals in assets/ into web-friendly WebP files in public/photos
// and writes src/data/photos.json. Run with: npm run photos
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets';
const OUT = 'public/photos';
const SIZES = [1280, 2560];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

const photos = [];
for (const file of files) {
  const id = path.parse(file).name;
  for (const w of SIZES) {
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${id}-${w}.webp`));
  }
  const { width, height } = await sharp(path.join(SRC, file)).metadata();
  photos.push({
    id,
    title: id,
    width,
    height,
    small: `photos/${id}-1280.webp`,
    large: `photos/${id}-2560.webp`,
  });
  console.log('optimized', file);
}

await writeFile('src/data/photos.json', JSON.stringify(photos, null, 2) + '\n');
console.log(`wrote src/data/photos.json (${photos.length} photos)`);
