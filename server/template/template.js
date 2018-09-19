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
      const position = 770 - shift;
      return `
      <text
       id="counter"
       stroke="#D94266"
       stroke-width="2"
       fill="#FFFFFF"
       font-family="Open Sans"
       font-size="66"
       font-weight="500">
      <tspan
         x="${position}"
         y="160"
         id="tspan25">${every}</tspan>
    </text>
      `;
    }
    case 'en': {
      return `
        <text
          id="percent"
          font-size="64"
          font-weight="500"
          style="font-weight:500;font-size:64px;font-family:Open Sans;fill:#ffffff;stroke:#d94266;stroke-width:2">
        <tspan
            x="510"
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
    '<g id="cloud" transform="translate(580, 210)">',
    cloud,
    '</g>',
    locales[i18n].footer,
  ];
  return result.join('');
}

export default compile;
