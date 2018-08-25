import Express from 'express';
import fs from 'fs';
import sharp from 'sharp';
import bodyParser from 'body-parser';

import crypto from 'crypto';

// import cloud from 'd3-cloud';

import lang from '../data/lang.json';

import genImage from './genImage';

const PORT = process.env.LH_API_PORT || 4000;

const PREVIEW = 'preview';

const earthPop = 7.6 * (10 ** 9);


function getImgUrl(id) {
  return `${PREVIEW}/${id}.png`;
}

const content = {
  ogTitle: 'test',
  ogSiteName: 'test',
  ogDescription: 'test',
  ogImage: 'test',
  twitterCard: 'test',
  twitterTitle: 'test',
  twitterImage: 'test',
  twitterUrl: 'test'
};

const app = new Express();
app.use(bodyParser.json());

app.use('/result/:url', (req, res) => {
  console.log('req.params.uid', req.params.url);
  const img = `/${getImgUrl(req.params.url)}`;
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${content.ogDescription}">
    <title>${content.ogTitle}</title>
    <meta property="og:title" content=${content.ogTitle} />
    <meta property="og:site_name" content=${content.ogSiteName}/>
    <meta property="og:description" content=${content.ogDescription} />
    <meta property="og:image" content=${img} />
    <meta name="twitter:card" content=${content.twitterCard} />
    <meta name="twitter:title" content=${content.twitterTitle} />
    <meta name="twitter:image" content=${img} />
    <meta name="twitter:url" content=${content.twitterUrl} />
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
  // const id = getReqId();
  // console.log('New ID', id);
  // console.log(req);
  // req.json().then(j => console.log('Hey Json', j));
  // console.log('body', req.body);
  const { selected, pop, i18n } = req.body;

  // const lngIds = selected.map(s => s.split('').map(c => c.charCodeAt()).join(''));
  // const id = lngIds.sort().join('_');

  const valid = selected.every(s => s in lang);
  // const id = selected.sort().join('');
  const hash = crypto.createHash('md5')
    .update(selected.sort().join('')).digest('hex');
  const id = `${i18n}${hash}`;

  console.log(
    `> New ReqID: ${id}, ${valid}`,
    `> Total: ${earthPop}`,
    `> Sharing: ${pop}`,
    `> I can understand every ${Math.round(earthPop / Number(pop))} Earther`,
    `> Languages: ${selected.join(' ')}`,
  );

  try {
    const file = getImgUrl(id);
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        const imgSvg = Buffer.from(genImage(selected));
        sharp(imgSvg)
          .png()
          .toFile(file)
          .then(() => {
            console.log('sharp is OK (new image ready)');
            res.send({
              success: true,
              result: id,
            });
          })
          .catch((e) => {
            console.log('Sharp error', e);
            res.send({
              success: false,
              result: null,
            });
          });
      } else {
        res.send({
          success: true,
          result: id,
        });
      }
    });
    // fs.writeFile(`${PREVIEW}/${id}.svg`, imgSvg);
  } catch (e) {
    console.log('Share error', e);
    res.send({
      success: false,
      result: id,
    });
  }
});
app.use(`/${PREVIEW}`, Express.static(PREVIEW));

app.listen(PORT, () => console.log('LH Api Listening on port', PORT));
