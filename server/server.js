import Express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

import lang from '../data/lang.json';

import generatePreviewImage from './genImage';

const PORT = process.env.LH_API_PORT || 4000;

const PREVIEW = 'preview';

const bin2text = mask => parseInt(mask, 2).toString(36);
const text2bin = text => parseInt(text, 36).toString(2);

const langList = Object.keys(lang).sort();
const version = 'ab';

function parseURL(url) {
  const arr = url.split('');
  const i18n = arr.slice(0, 2).join('');
  const v = arr.slice(2, 4).join('');
  const text = arr.slice(4).join('');
  return {
    i18n, version: v, text
  };
}

function getMask(selected) {
  const selectedAsMap = selected
    .reduce((prev, cur) => ({ ...prev, [cur]: true }), {});
  const mask = langList.map(c => (c in selectedAsMap ? 1 : 0));
  const text = bin2text(mask.join(''));
  return text;
}

function getLanguages(text) {
  const mask = text2bin(text).split('').reverse();
  const answer = langList.reverse()
    .reduce((prev, cur, idx) => (
      mask[idx] === '1' ? [...prev, cur] : prev), []);
  return answer;
}

function getImgUrl(id) {
  return { png: `${PREVIEW}/${id}.png`, svg: `${PREVIEW}/${id}.svg` };
}

function parseBody(body) {
  const { selected, i18n } = body;
  const hash = getMask(selected);
  const id = `${i18n}${version}${hash}`;
  const files = getImgUrl(id);
  const valid = selected.every(s => s in lang);
  return {
    id, hash, valid, ...files
  };
}

const contentRu = {
  ogTitle: 'Атлас языков',
  ogDescription: 'Интерактивный атлас популярных языков',
  twitterTitle: 'Атлас языков',
};

const contentEn = {
  ogTitle: 'Linguistic map',
  ogDescription: 'Interactive map of popular languages',
  twitterTitle: 'Linguistic map',
};

const contentBase = {
  ogSiteName: 'lh.chron.ist',
  // ogImage: 'test',
  twitterCard: 'photo',
  // twitterImage: 'test',
  twitterUrl: ''
};

const app = new Express();
app.use(bodyParser.json());

app.use('/result/:url', (req, res) => {
  // console.log('req.params.uid', req.params.url);
  const parsed = parseURL(req.params.url);
  if (process.env !== 'production') {
    const selected = getLanguages(parsed.text);
    console.log('Parsed params', parsed);
    console.log('Selected languages', selected);
  }

  const img = `/${getImgUrl(req.params.url).png}`;
  // russian locale for hello
  const content = parsed.i18n === 'en'
    ? { ...contentBase, ...contentEn }
    : { ...contentBase, ...contentRu };
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${content.ogDescription}">
    <title>${content.ogTitle}</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <meta property="og:title" content="${content.ogTitle}" />
    <meta property="og:site_name" content="${content.ogSiteName}" />
    <meta property="og:description" content="${content.ogDescription}" />
    <meta property="og:image" content="${img}" />
    <meta name="twitter:card" content="${content.twitterCard}" />
    <meta name="twitter:title" content="${content.twitterTitle}" />
    <meta name="twitter:image" content="${img}" />
    <meta name="twitter:url" content="${content.twitterUrl}" />
  </head>
  <body>
    <script type="text/javascript">
      window.location.href = '/';
    </script>
  </body>
</html>
  `;
  res.send(html);
});

let reqCounter = 0;

app.post('/share', (req, res) => {
  const { selected, check, force } = req.body;

  const rc = reqCounter;
  reqCounter += 1;

  const {
    id, png, valid
  } = parseBody(req.body);

  console.log('\n');
  console.time(id);
  console.log(
    `${rc} > New ReqID: ${id}, ${valid}\n`,
    `${rc} > Languages: ${selected.join(' ')}\n`,
  );
  try {
    fs.access(png, fs.constants.F_OK, async (err) => {
      try {
        if (err || force === true) {
          if (check !== true) {
            await generatePreviewImage(req.body, parseBody(req.body), rc);
          }
          res.send({
            selected,
            success: true,
            result: id,
            ready: false,
          });
        } else {
          res.send({
            selected,
            success: true,
            result: id,
            ready: true,
          });
        }
      } catch (ex) {
        console.log('Access error', ex);
      }
    });
  } catch (e) {
    console.log('Share error', e);
    res.send({
      selected,
      ready: false,
      success: false,
      result: id,
    });
  }
  console.timeEnd(id);
});
app.use(`/${PREVIEW}`, Express.static(PREVIEW));

try {
  app.listen(PORT, () => console.log('LH Api Listening on port', PORT));
} catch (h) {
  console.error('Major error occurred', h);
}
