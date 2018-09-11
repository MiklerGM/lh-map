import fs from 'fs';

const template = 'server/template';

const earthPop = 7.6 * (10 ** 9);
const ePercent = earthPop / 100;
const planets = [];
const locales = { ru: {}, en: {} };

const getRandomPlanet = () => (
  planets[Math.round(Math.random() * (planets.length - 1))]
);

fs.readdirSync(`${template}/planets`).forEach((file) => {
  console.log('planets >', file);
  const img = fs.readFileSync(`${template}/planets/${file}`);
  planets.push(img);
});

Object.keys(locales).map(i18n => (
  fs.readdirSync(`${template}/${i18n}`).forEach((file) => {
    console.log(`locale ${i18n} >`, file);
    const svg = fs.readFileSync(`${template}/${i18n}/${file}`);
    const key = file.replace('.xml', '');
    locales[i18n][key] = svg;
  })));

function getCounter(i18n, pop) {
  const every = Math.round(earthPop / Number(pop));
  const percent = Math.round(Number(pop) / ePercent);

  switch (i18n) {
    case 'ru': {
      const shift = every.toString().length * 30;
      const position = 590 + shift;
      console.log('RU', every, every.length, shift, position);
      return `
      <text
        style="font-weight:500;font-size:64px;font-family:OpenSans-SemiBold, 'Open Sans';fill:#ffffff;stroke:#d94266;stroke-width:2"
        font-weight="500"
        font-size="64"
        id="counter">
        <tspan id="tspan28" y="105" x="535">
          ${every}
        </tspan>
      </text>
      <text
        style="font-weight:bold;font-size:36px;font-family:OpenSans-Bold, 'Open Sans';fill:#013243"
        font-weight="bold"
        font-size="36"
        id="человек-в-мире!">
        <tspan
          id="tspan16"
          y="96"
          x="${position}">человек в мире!
        </tspan>
    </text>`;
    }
    case 'en': {
      return `
        <text
          id="percent"
          font-size="64"
          font-weight="500"
          style="font-weight:500;font-size:64px;font-family:OpenSans-SemiBold, 'Open Sans';fill:#ffffff;stroke:#d94266;stroke-width:2">
        <tspan
            x="350"
            y="90"
            id="tspan24">${percent}%</tspan>
        </text>
      `;
    }
    default: return '';
  }
}

function compile(cloud, pop, i18n) {
  const counter = getCounter(i18n, pop);
  const result = [
    locales[i18n].header,
    locales[i18n].background,
    getRandomPlanet(),
    locales[i18n].text,
    counter,
    '<g id="cloud" transform="translate(550, 180)">',
    cloud,
    '</g>',
    locales[i18n].footer,
  ];
  return result.join('');
}

export default compile;
