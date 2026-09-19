const sharp = require('sharp');
const path = require('path');

async function testComposite() {
  const framePath = 'd:/trungthu_thuy/trung-thu/public/images/frames/dau-lan.png';
  const maskPath = 'd:/trungthu_thuy/trung-thu/public/images/frames/dau-lan-mask.png';
  
  const frameMeta = await sharp(framePath).metadata();
  const width = frameMeta.width;
  const height = frameMeta.height;

  const paperSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="paperGlow" cx="50%" cy="52%" r="55%">
          <stop offset="0%" stop-color="#FFFBEB" stop-opacity="0.95"/>
          <stop offset="25%" stop-color="#FDE047" stop-opacity="0.85"/>
          <stop offset="55%" stop-color="#F43F5E" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#BE123C" stop-opacity="0.7"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#paperGlow)"/>
    </svg>
  `);

  const paperBuffer = await sharp(paperSvg).png().toBuffer();

  const maskedPaper = await sharp(paperBuffer)
    .composite([{ input: maskPath, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(maskedPaper)
    .composite([{ input: framePath, blend: 'over' }])
    .png()
    .toFile('d:/trungthu_thuy/trung-thu/public/images/frames/test_composite_lantern.png');

  console.log('Saved test_composite_lantern.png');
}

testComposite();
