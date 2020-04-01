import cloud from 'd3-cloud';

import fs from 'fs';
import { createCanvas } from 'canvas';
import svg2img from 'svg2img';
import EventEmitter from 'events';

import lang from '../data/lang.json';
import regions from '../data/regions.json';


import compileTemplate from './template/template';


// const angles = [-90, -45, 0, 45, 90];
const angles = [0];
const colors = ['FF6161', '263F66', 'F9AA54', '75D5EF', 'A55F94', '669966', '944564'];

const dimensions = {
  ru: {
    width: 720,
    height: 340,
    x: 470,
    y: 150,
  },
  en: {
    width: 720,
    height: 330,
    x: 470,
    y: 160,
  }
};
const sizeMultiplier = 2;

const getStyle = (w) => ([
  `font-family:${w.font}`,
  `font-size:${w.size}px`,
  `fill:#${w.color}`,
  `fill-opacity:${w.opacity}`,
  '' // for closing ';'
].join('; '));

const baseFontSize = [60, 55, 48, 38, 34, 32, 30, 28];

const drawEmitter = new EventEmitter();

function getWords(selected) {
  const base = baseFontSize[Math.round(selected.length * 0.1)];
  return selected.map((d) => ({
    text: lang[d].display,
    font: lang[d].font,
    size: base - lang[d].display.length + Math.round(Math.random() * (base / 2)),
    // size: 14 + Math.round(Math.random() * 44),
    rotate: angles[Math.round(Math.random() * (angles.length - 1))],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
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

function genSVG(cloudWords, size, i18n) {
  const svg = cloudWords.map((w) => (
    `<text
      style="${getStyle(w)}"
      transform="translate(${w.x}, ${w.y}) rotate(${w.rotate}, 0, 0)"
      text-anchor="middle"
      >
        ${w.text}
    </text>`));

  const viewBox = getSize(size);

  const {
    width: w, height: h, x, y
  } = dimensions[i18n];
  const cloudInBox = [
    `<g id="cloud" transform="translate(${x}, ${y})">`,
    `<svg width="${w}" height="${h}" viewBox="${viewBox}">`,
    `<g transform="translate(${w}, ${h})">`,
    ...svg,
    '</g>',
    '</svg>',
    '</g>'
  ].join(' ');
  return cloudInBox;
}

function calcCloud(words, endCb, size) {
  try {
    const c = createCanvas(1, 1);
    cloud().size(size)
      .canvas(c)
      .words(words)
      .padding(10)
      .rotate((d) => d.rotate)
      .font((w) => w.font)
      .fontSize((d) => d.size)
      .on('end', endCb)
      .start();
  } catch (e) {
    console.log(e);
    throw Error('Cloud generation failed', e);
  }
}

function saveImg(cloudWords, size, pop, i18n, svg, png, rc, cc) {
  console.log(rc, 'Size >', size);
  const cloudSVG = genSVG(cloudWords, size, i18n);
  const imgSvg = compileTemplate(cloudSVG, pop, i18n, cc);
  if (process.env.NODE_ENV !== 'production') {
    fs.writeFile(svg, imgSvg, (e) => { if (e) throw e; });
  }

  console.time(`${rc}_svg2img`);

  svg2img(imgSvg, (error, buffer) => {
    if (error) throw Error('PNG generation failed', error);

    // returns a Buffer
    console.timeEnd(`${rc}_svg2img`);
    fs.writeFile(
      png,
      buffer,
      (e) => { if (e) throw Error('PNG saving failed', e); }
    );
  });
}

drawEmitter.on('share', (data) => {
  const {
    cloudWords, size, pop, i18n, svg, png, rc, cc
  } = data;
  // check if file already exists
  // fs.access(hash.png, fs.constants.F_OK, (err) => {
  //   if (err) {
  saveImg(cloudWords, size, pop, i18n, svg, png, rc, cc);
  // }
});

function generatePreviewImage(body, hash, rc) {
  const { selected, pop, i18n } = body;
  const {
    svg, png
  } = hash;

  console.time(`${rc}_countries`);
  const countries = selected.reduce((prev, l) => ({
    ...prev,
    ...lang[l].countries.reduce((p, c) => {
      if (typeof regions[c] === 'undefined') console.error('No valid region data for', c);
      const owner = (c in regions) ? regions[c].owner : null;
      return (
        { ...p, [c]: owner }
      );
    }, {})
  }), {});

  const cc = Object.keys(countries).reduce((p, c) => {
    const r = countries[c];
    if ((r === null) // it's not a region
    || (r !== null && !(r in countries))) { // it's a region
      return p + 1;
    }
    return p;
  }, 0);
  console.timeEnd(`${rc}_countries`);

  console.time(`${rc}_genImg`);
  const words = getWords(selected);

  const endCb = (cloudWords, size) => {
    console.timeEnd(`${rc}_calCloud`);
    drawEmitter.emit('share', {
      cloudWords, size, pop, i18n, svg, png, rc, cc
    });
  };

  console.time(`${rc}_calCloud`);
  const { width: w, height: h } = dimensions[i18n];
  calcCloud(words, endCb, [w * sizeMultiplier, h * sizeMultiplier]);
  console.timeEnd(`${rc}_genImg`);
}

export default generatePreviewImage;
