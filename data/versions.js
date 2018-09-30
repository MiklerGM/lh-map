export const version = 'ad';

// old versions before 'ad' was sorted
// const lang = require('./lang_ac.json');
// console.log(JSON.stringify(Object.keys(lang).sort()));
const aa = ['ALB', 'ARA', 'ARM', 'BAQ', 'BRE', 'BUL', 'CAT', 'CHN', 'CHR', 'CHV',
  'COP', 'CZE', 'DAN', 'DUT', 'ENG', 'EPO', 'EST', 'FAO', 'FIN', 'FRA', 'GEO',
  'GER', 'GLA', 'GLE', 'GLV', 'GRE', 'HEB', 'HIN', 'HRV', 'HUN', 'ICE', 'IND',
  'ITA', 'JAP', 'KAZ', 'KHM', 'KOM', 'KOR', 'LAT', 'LAV', 'LIT', 'MLT',
  'NEP', 'NOR', 'PER', 'POL', 'POR', 'RSL', 'RUN', 'RUS', 'SCH', 'SLO', 'SMO',
  'SPA', 'SRP', 'SWE', 'TAI', 'TAT', 'TLH', 'TUR', 'UKR', 'URD', 'WEL', 'YKG'];

const ac = [...aa.slice(0, 40), 'LIJ', ...aa.slice(40)]; // Added Ligurian

const ad = ['ENG', 'ALB', 'ARA', 'ARM', 'BAQ', 'BRE', 'CAT', 'WEL', 'HUN', 'GRE',
  'GEO', 'GLA', 'DAN', 'RSL', 'HEB', 'IND', 'GLE', 'ICE', 'SPA', 'ITA', 'TLH',
  'KOM', 'COP', 'KOR', 'LAT', 'LAV', 'LIT', 'MLT', 'GLV', 'GER', 'NEP', 'DUT',
  'NOR', 'POL', 'POR', 'RUN', 'RUS', 'SRP', 'SLO', 'TAI', 'TAT', 'TUR', 'UKR',
  'FAO', 'PER', 'FRA', 'FIN', 'HIN', 'URD', 'HRV', 'SWE', 'CZE', 'CHR', 'CHV',
  'EST', 'EPO', 'YKG', 'JAP', 'CHN', 'SCH', 'LIJ', 'KAZ', 'KHM', 'BUL', 'SMO',
  // append additional languages here
];

export const langList = (v) => {
  switch (v) {
    case false: return [];
    case 'aa':
    case 'ab': return aa;
    case 'ac': return ac;
    case 'ad':
    default: return ad;
  }
};
