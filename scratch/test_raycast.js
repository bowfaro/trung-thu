const sharp = require('sharp');
const path = require('path');

async function testRaycast(id) {
  const framePath = `d:/trungthu_thuy/trung-thu/public/images/frames/${id}.png`;
  const { data, info } = await sharp(framePath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Binary grid: bamboo pixel where alpha > 40
  const isBamboo = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    return data[(y * width + x) * channels + 3] > 40;
  };

  // Precompute ray hits for fast lookup
  const hasUp = new Uint8Array(width * height);
  const hasDown = new Uint8Array(width * height);
  const hasLeft = new Uint8Array(width * height);
  const hasRight = new Uint8Array(width * height);

  for (let x = 0; x < width; x++) {
    let seen = false;
    for (let y = 0; y < height; y++) {
      if (isBamboo(x, y)) seen = true;
      if (seen) hasUp[y * width + x] = 1;
    }
    seen = false;
    for (let y = height - 1; y >= 0; y--) {
      if (isBamboo(x, y)) seen = true;
      if (seen) hasDown[y * width + x] = 1;
    }
  }

  for (let y = 0; y < height; y++) {
    let seen = false;
    for (let x = 0; x < width; x++) {
      if (isBamboo(x, y)) seen = true;
      if (seen) hasLeft[y * width + x] = 1;
    }
    seen = false;
    for (let x = width - 1; x >= 0; x--) {
      if (isBamboo(x, y)) seen = true;
      if (seen) hasRight[y * width + x] = 1;
    }
  }

  const maskBuf = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    // Inside if it has bamboo in all 4 cardinal directions
    if (hasUp[i] && hasDown[i] && hasLeft[i] && hasRight[i]) {
      maskBuf[i * 4] = 255;
      maskBuf[i * 4 + 1] = 255;
      maskBuf[i * 4 + 2] = 255;
      maskBuf[i * 4 + 3] = 255;
    }
  }

  await sharp(maskBuf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(`d:/trungthu_thuy/trung-thu/public/images/frames/raycast_${id}.png`);
  console.log(`Saved raycast_${id}.png`);
}

async function run() {
  await testRaycast('ca-chep');
  await testRaycast('rong-vang');
  await testRaycast('tho-ngoc');
}
run();
