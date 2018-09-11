import cloud from 'd3-cloud';

import Canvas from 'canvas';

import lang from '../data/lang.json';

import compileTemplate from './template/template';


const angles = [-90, -45, 0, 45, 90];
const colors = ['FF6161', '263F66', 'F9AA54', '75D5EF', 'A55F94', '669966', '944564'];
const fontFamily = 'Open Sans';
const width = 1600;
const height = 800;

const getStyle = w => ([
  `font-family:${fontFamily}`,
  `font-size:${w.size}px`,
  `fill:#${w.color}`,
  `fill-opacity:${w.opacity}`,
  '' // for closing ';'
].join('; '));

const baseFontSize = [60, 55, 48, 38, 28, 20];

function getWords(selected, i18n) {
  const base = baseFontSize[Math.round(selected.length * 0.1)];
  return selected.map(l => lang[l].i18n[i18n])
    .map(d => ({
      text: d,
      size: base - d.length + Math.round(Math.random() * (base / 2)),
      // size: 14 + Math.round(Math.random() * 44),
      rotate: angles[Math.round(Math.random() * 4)],
      color: colors[Math.round(Math.random() * 6)],
      opacity: 1 - (Math.random() * 0.2), // opacity from 0.8 to 1
    }));
}

function getSize(size) {
  if (size === null) return '0 0 0 0';
  const padding = 8;
  const top = size[0].x - padding;
  const left = size[0].y - padding;
  const xSize = size[1].x - size[0].x + (2 * padding); // width or length
  const ySize = size[1].y - size[0].y + (2 * padding); // height

  // return in viewBox format
  return `${top} ${left} ${xSize} ${ySize}`;
}

function genSVG(cloudWords, size) {
  const svg = cloudWords.map(w => (
    `<text
      style="${getStyle(w)}"
      transform="translate(${w.x}, ${w.y}) rotate(${w.rotate}, 0, 0)"
      text-anchor="middle"
      >
        ${w.text}
    </text>`));

  const viewBox = getSize(size);

  const cloudInBox = [
    `<svg width="600" height="300" viewBox="${viewBox}">`,
    `<g transform="translate(${width / 2}, ${height / 2})">`,
    ...svg,
    '</g>',
    '</svg>'
  ].join(' ');
  return cloudInBox;
}

function calcCloud(words, endCb) {
  cloud().size([width, height])
    .canvas(() => (new Canvas(1, 1)))
    .words(words)
    .padding(5)
    .rotate(d => d.rotate)
    .font(fontFamily)
    .fontSize(d => d.size)
    .on('end', endCb)
    .start();
}

function generatePreviewImage(i18n, pop, selected, saveImg) {
  console.time('genImg');
  const words = getWords(selected, i18n);
  console.time('calCloud');
  const endCb = (cloudWords, size) => {
    console.timeEnd('calCloud');
    console.log('Size >', size);
    const cloudSVG = genSVG(cloudWords, size);
    const template = compileTemplate(cloudSVG, pop, i18n);
    const imgSvg = Buffer.from(template);
    saveImg(imgSvg);
  };
  calcCloud(words, endCb);
  console.timeEnd('genImg');
}

export default generatePreviewImage;
