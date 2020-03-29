const fs = require('fs');
const mapGeo = require('./map.json');

const regions = {};
const rKey = 'adm0_a3';

mapGeo.features.map((f) => {
  const adm = f.properties[rKey];
  regions[adm] = f.properties;
  return null;
});

const listOfRegions = Object.keys(regions);
listOfRegions.map((r) => {
  regions[r].owner = regions[r].region !== ''
    ? listOfRegions.find((f) => regions[f].admin === regions[r].admin)
    : null;
  return null;
});

fs.writeFileSync('./regions.json', JSON.stringify(regions));
