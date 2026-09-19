const sharp = require('sharp');
const fs = require('fs');
const frames = ['ngoi-sao', 'ca-chep', 'tho-ngoc', 'rong-vang', 'hoa-sen', 'dau-lan'];

async function testAll() {
  for (const id of frames) {
    const framePath = 'd:/trungthu_thuy/trung-thu/public/images/frames/' + id + '.png';
    const maskPath = 'd:/trungthu_thuy/trung-thu/public/images/frames/' + id + '-mask.png';
    const meta = await sharp(framePath).metadata();
    const { width, height } = meta;

    const paperSvg = Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="paperGlow" cx="50%" cy="52%" r="55%">
            <stop offset="0%" stop-color="#FFFBEB" stop-opacity="0.95"/>
            <stop offset="25%" stop-color="#FDE047" stop-opacity="0.88"/>
            <stop offset="55%" stop-color="#F43F5E" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#BE123C" stop-opacity="0.7"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#paperGlow)"/>
      </svg>
    `);

    const paperBuf = await sharp(paperSvg).png().toBuffer();
    const maskedPaper = await sharp(paperBuf).composite([{ input: maskPath, blend: 'dest-in' }]).png().toBuffer();
    await sharp(maskedPaper).composite([{ input: framePath, blend: 'over' }]).png().toFile('d:/trungthu_thuy/trung-thu/public/images/frames/preview_' + id + '.png');
    console.log('Preview generated for:', id);
  }
}
testAll();
