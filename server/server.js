import Express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

import {
  PREVIEW,
  getImgUrl,
  parseBody,
  getLanguages,
  parseURL,
} from './analyzeRequest';

import generatePreviewImage from './genImage';

const PORT = process.env.LH_API_PORT || 4000;

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
  const selected = getLanguages(parsed.text, parsed.version);
  console.log('Parsed params', parsed);
  console.log('Selected languages', selected);
  // if (process.env.NODE_ENV !== 'production') {
  // }

  const img = `/${getImgUrl(req.params.url).png}`;
  // russian locale for hello
  const content = parsed.i18n === 'en'
    ? { ...contentBase, ...contentEn }
    : { ...contentBase, ...contentRu };
  const ref = req.headers.referrer || req.headers.referer;
  const referer = typeof ref === 'undefined' ? '' : `&from=${encodeURIComponent(ref)}`;
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
      window.location.href = '/?r=${parsed.text}&v=${parsed.version}${referer}';
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
