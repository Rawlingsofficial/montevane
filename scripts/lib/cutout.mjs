// Cuts a product out of its studio photo: flood fill from the edges over the
// neutral background, plus enclosed background patches (inside handles and
// necklace loops). Shared by compose-showcase.mjs and compose-gallery.mjs.

import sharp from "sharp";

const dist = (d, i, j) => Math.abs(d[i] - d[j]) + Math.abs(d[i + 1] - d[j + 1]) + Math.abs(d[i + 2] - d[j + 2]);

/** Product cut out of its background (flood fill from the edges), trimmed, as RGBA PNG — or null if unusable. */
export async function cutout(url, base = "https://www.montevane.com", size = 900) {
  const res = await fetch(base + url);
  if (!res.ok) return null;
  const src = sharp(Buffer.from(await res.arrayBuffer())).resize(size, size, { fit: "inside", withoutEnlargement: true }).removeAlpha();
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const at = (x, y) => (y * w + x) * 3;

  // Background reference: median of the border.
  const border = [];
  for (let x = 0; x < w; x++) border.push(at(x, 0), at(x, h - 1));
  for (let y = 0; y < h; y++) border.push(at(0, y), at(w - 1, y));
  const lum = (i) => data[i] + data[i + 1] + data[i + 2];
  const ref = border.sort((a, b) => lum(a) - lum(b))[border.length >> 1];
  if (lum(ref) < 3 * 150) return null; // dark backgrounds don't cut cleanly
  const darkest = lum(border[Math.floor(border.length * 0.02)]);
  // Studio backgrounds are neutral (low saturation) and may run as a gradient.
  const isBg = (i) => Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) < 22 && lum(i) >= darkest - 24;

  const bg = new Uint8Array(w * h);
  const queue = [];
  for (const i of border) {
    const p = i / 3;
    if (!bg[p] && isBg(i)) { bg[p] = 1; queue.push(p); }
  }
  while (queue.length) {
    const p = queue.pop();
    const x = p % w;
    const y = (p / w) | 0;
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const q = ny * w + nx;
      if (bg[q]) continue;
      if (isBg(q * 3) && dist(data, q * 3, p * 3) < 16) { bg[q] = 1; queue.push(q); }
    }
  }

  // Enclosed background (inside a necklace loop or a handle): large patches
  // the fill couldn't reach that are almost exactly the background colour.
  const near = (i) => dist(data, i, ref) < 18;
  const seen = new Uint8Array(w * h);
  for (let start = 0; start < w * h; start++) {
    if (bg[start] || seen[start] || !near(start * 3)) continue;
    const region = [start];
    seen[start] = 1;
    for (let k = 0; k < region.length; k++) {
      const p = region[k], x = p % w, y = (p / w) | 0;
      for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const q = ny * w + nx;
        if (!bg[q] && !seen[q] && near(q * 3)) { seen[q] = 1; region.push(q); }
      }
    }
    if (region.length > w * h * 0.004) for (const p of region) bg[p] = 1;
  }

  // Foreground sanity: a real object, not touching the frame (cropped product).
  let fg = 0, minX = w, minY = h, maxX = 0, maxY = 0, edge = 0, bottom = 0;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (!bg[y * w + x]) {
        fg++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        // Touching the bottom is fine (the piece stands on the floor line);
        // touching the top or sides means the product is cropped.
        if (y >= h - 2) bottom++;
        else if (x < 2 || y < 2 || x >= w - 2) edge++;
      }
  const share = fg / (w * h);
  if (share < 0.04 || share > 0.8 || edge > (w + h) * 0.01) {
    if (process.env.DEBUG) console.log("  reject", url.split("/").pop(), { share: share.toFixed(2), edge, bottom });
    return null;
  }

  const alpha = Buffer.alloc(w * h);
  for (let p = 0; p < w * h; p++) alpha[p] = bg[p] ? 0 : 255;
  const mask = await sharp(alpha, { raw: { width: w, height: h, channels: 1 } }).blur(1.2).extractChannel(0).raw().toBuffer();
  const rgba = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    rgba[p * 4] = data[p * 3];
    rgba[p * 4 + 1] = data[p * 3 + 1];
    rgba[p * 4 + 2] = data[p * 3 + 2];
    rgba[p * 4 + 3] = mask[p];
  }
  const pad = 4;
  const left = Math.max(0, minX - pad), top = Math.max(0, minY - pad);
  const width = Math.min(w - left, maxX - minX + pad * 2), height = Math.min(h - top, maxY - minY + pad * 2);
  return sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).extract({ left, top, width, height }).png().toBuffer();
}

