import fs from 'fs';

const template = 'server/template';

// const earthPop = 7.6 * (10 ** 9);
// const ePercent = earthPop / 100;
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

Object.keys(locales).map((i18n) => (
  fs.readdirSync(`${template}/${i18n}`).forEach((file) => {
    const svg = fs.readFileSync(`${template}/${i18n}/${file}`);
    const key = file.replace('.xml', '');
    locales[i18n][key] = svg;
  })));

const pluralRu = (count) => {
  const last = count.toString().split('').pop();
  console.log('Last', last);
  if (count !== 0) {
    return (last === '1' && count !== 11)
      ? 'стране'
      : 'странах';
  }
  return 'стран';
};

const pluralEn = (count) => (
  count === 1 ? 'country' : 'countries'
);

function getCounter(i18n, pop, countries) {
  // const every = Math.round(earthPop / Number(pop));
  // const percent = Math.round(Number(pop) / ePercent);
  // const countries = 0;
  const shift = countries.toString().length * 30;

  switch (i18n) {
    case 'ru': {
      const plural = pluralRu(countries);
      return `
      <text
        font-weight="500"
        font-size="64"
        font-family="OpenSans-SemiBold, Open Sans"
        fill="#FFFFFF"
        stroke-width="2"
        stroke="#D94266"
        id="counter">
        <tspan
            id="tspan29"
            y="99"
            x="525">${countries}</tspan>
      </text>
      <text
       fill="#013243"
       font-weight="bold"
       font-size="36"
       font-family="OpenSans-Bold, Open Sans"
       id="странах-мира!">
        <tspan
          id="tspan17"
          y="92"
          x="${575 + shift}">${plural} мира! Я знаю</tspan>
      </text>
      <text
       fill="#013243"
       font-weight="bold"
       font-size="36"
       font-family="OpenSans-Bold, Open Sans"
       id="Меня-понимает-59-000">
      <tspan
         id="tspan11-1"
         y="43"
         x="468">Меня понимает ${pop} людей</tspan>
    </text>
      `;
    }
    case 'en': {
      const plural = pluralEn(countries);
      return `
          <text
            fill="#013243"
            font-weight="bold"
            font-size="36"
            font-family="OpenSans-Bold, Open Sans"
            id="people">
            <tspan
              id="tspan11"
              y="43"
              x="468">${pop} people from</tspan>
          </text>
          <g id="countries">
          <text
              style="font-weight:bold;font-size:36px;font-family:OpenSans-Bold, 'Open Sans';fill:#013243"
              id="countries-of-the-wor"
              font-size="36"
              font-weight="bold">
            <tspan
                x="${520 + shift}"
                y="99"
                id="tspan14">${plural} of the world speak the</tspan>
            <tspan
                x="${520 + shift}"
                y="148"
                id="tspan16">same language as me!</tspan>
          </text>
          <text
              style="font-weight:bold;font-size:36px;font-family:OpenSans-Bold, 'Open Sans';fill:#013243"
              id="I-speak"
              font-size="36"
              font-weight="bold">
            <tspan
                x="${921 + shift}"
                y="148"
                id="tspan25">I speak</tspan>
          </text>
        </g>
        <text
          font-weight="500"
          font-size="64"
          font-family="OpenSans-SemiBold, Open Sans"
          fill="#FFFFFF"
          stroke-width="2"
          stroke="#D94266"
          id="28">
          <tspan
            id="tspan28"
            y="135"
            x="468">${countries}</tspan>
      </text>
      `;
    }
    default: return '';
  }
}

function compile(cloud, pop, i18n, cc) {
  const counter = getCounter(i18n, pop, cc);
  const result = [
    locales[i18n].header,
    locales[i18n].background,
    getRandomPlanet(),
    locales[i18n].text,
    counter,
    cloud,
    locales[i18n].footer,
  ];
  return result.join('');
}

export default compile;
