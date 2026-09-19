const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const frames = ['ngoi-sao', 'ca-chep', 'tho-ngoc', 'rong-vang', 'hoa-sen', 'dau-lan'];
const dir = 'd:/trungthu_thuy/trung-thu/public/images/frames';

async function generateMasks() {
  for (const id of frames) {
    const framePath = path.join(dir, `${id}.png`);
    const maskPath = path.join(dir, `${id}-mask.png`);

    const { data, info } = await sharp(framePath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // 1. Bamboo mask: alpha > 50
    const bamboo = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      bamboo[i] = data[i * channels + 3] > 50 ? 1 : 0;
    }

    // 2. Dilate to bridge gaps
    const R = 15;
    const dilated = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (bamboo[y * width + x] === 1) {
          for (let dy = -R; dy <= R; dy++) {
            const ny = y + dy;
            if (ny < 0 || ny >= height) continue;
            for (let dx = -R; dx <= R; dx++) {
              if (dx * dx + dy * dy <= R * R) {
                const nx = x + dx;
                if (nx >= 0 && nx < width) {
                  dilated[ny * width + nx] = 1;
                }
              }
            }
          }
        }
      }
    }

    // 3. Flood fill exterior from perimeter
    const outside = new Uint8Array(width * height);
    const queue = [];
    function pushIf(x, y) {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const idx = y * width + x;
        if (dilated[idx] === 0 && outside[idx] === 0) {
          outside[idx] = 1;
          queue.push(idx);
        }
      }
    }
    for (let x = 0; x < width; x++) { pushIf(x, 0); pushIf(x, height - 1); }
    for (let y = 0; y < height; y++) { pushIf(0, y); pushIf(width - 1, y); }

    let head = 0;
    while (head < queue.length) {
      const idx = queue[head++];
      const qx = idx % width;
      const qy = Math.floor(idx / width);
      pushIf(qx + 1, qy);
      pushIf(qx - 1, qy);
      pushIf(qx, qy + 1);
      pushIf(qx, qy - 1);
    }

    // 4. Solid hull = 1 where outside === 0
    const hull = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      hull[i] = outside[i] === 0 ? 1 : 0;
    }

    // 5. Erode back by ER = R to tuck neatly inside outer bamboo edge
    const ER = R - 1;
    const eroded = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (hull[y * width + x] === 1) {
          let allIn = true;
          for (let dy = -ER; dy <= ER; dy++) {
            const ny = y + dy;
            if (ny < 0 || ny >= height) { allIn = false; break; }
            for (let dx = -ER; dx <= ER; dx++) {
              if (dx * dx + dy * dy <= ER * ER) {
                const nx = x + dx;
                if (nx < 0 || nx >= width || hull[ny * width + nx] === 0) {
                  allIn = false;
                  break;
                }
              }
            }
            if (!allIn) break;
          }
          if (allIn) eroded[y * width + x] = 1;
        }
      }
    }

    // Generate mask buffer
    const maskBuf = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      if (eroded[i] === 1) {
        maskBuf[i * 4] = 255;
        maskBuf[i * 4 + 1] = 255;
        maskBuf[i * 4 + 2] = 255;
        maskBuf[i * 4 + 3] = 255;
      } else {
        maskBuf[i * 4] = 0;
        maskBuf[i * 4 + 1] = 0;
        maskBuf[i * 4 + 2] = 0;
        maskBuf[i * 4 + 3] = 0;
      }
    }

    await sharp(maskBuf, { raw: { width, height, channels: 4 } })
      .blur(1.2)
      .png()
      .toFile(maskPath);

    console.log(`Generated mask for ${id}: ${width}x${height}`);
  }
}

generateMasks().catch(console.error);
