import Express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
// import EventEmitter from 'events';

import crypto from 'crypto';

import lang from '../data/lang.json';

import generatePreviewImage from './genImage';

const PORT = process.env.LH_API_PORT || 4000;

const PREVIEW = 'preview';


function getImgUrl(id) {
  return { png: `${PREVIEW}/${id}.png`, svg: `${PREVIEW}/${id}.svg` };
}

function parseBody(body) {
  const { selected, i18n } = body;
  const hash = crypto.createHash('md5')
    .update(selected.sort().join('')).digest('hex');

  const id = `${i18n}${hash}`;
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

// const drawEmitter = new EventEmitter();
// drawEmitter.on('share', (body) => {
//   const hash = parseBody(body);
//   console.log('Share Event:', body.selected.join(' '));
//   console.log('Trying file', hash.png);
//   // check if file already exists
//   fs.access(hash.png, fs.constants.F_OK, (err) => {
//     if (err) {
//       generatePreviewImage(body, hash);
//     }
//   });
// });

app.use('/result/:url', (req, res) => {
  console.log('req.params.uid', req.params.url);
  const img = `/${getImgUrl(req.params.url).png}`;
  // russian locale for hello
  const content = req.params.url.match(/^en/) !== null
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

app.post('/share', (req, res) => {
  const { selected, check } = req.body;

  const {
    id, png, valid
  } = parseBody(req.body);

  console.log('\n');
  console.time(id);
  console.log(
    `> New ReqID: ${id}, ${valid}\n`,
    `> Languages: ${selected.join(' ')}\n`,
  );
  try {
    fs.access(png, fs.constants.F_OK, async (err) => {
      if (err) {
        if (check !== true) {
          await generatePreviewImage(req.body, parseBody(req.body));
          // drawEmitter.emit('share', req.body);
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

app.listen(PORT, () => console.log('LH Api Listening on port', PORT));
