import Express from 'express';
import fs from 'fs';
import sharp from 'sharp';
import bodyParser from 'body-parser';

import lang from '../data/lang.json';

import genImage from './genImage';

const PORT = process.env.LH_API_PORT || 4000;

const PREVIEW = 'preview';

const earthPop = 7.6 * (10 ** 9);

function getReqId() {
  const date = Date.now().toString(36);
  const rand = Math.random().toString(36).substr(2, 5);
  return `${date}${rand}`;
}

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
  const id = getReqId();
  console.log('New ID', id);
  // console.log(req);
  // req.json().then(j => console.log('Hey Json', j));
  // console.log('body', req.body);
  const { selected, pop } = req.body;
  console.log(
    `> Total: ${earthPop}`,
    `> Sharing: ${pop}`,
    `> I can understand every ${Math.round(earthPop / Number(pop))} Earther`,
    `> Languages: ${selected.join(' ')}`,
  );

  try {
    const imgSvg = Buffer.from(genImage(selected));
    fs.writeFile(`${PREVIEW}/${id}.svg`, imgSvg);

    sharp(imgSvg)
      .png()
      .toFile(getImgUrl(id))
      .then(() => {
        console.log('sharp is OK');
        res.send({
          success: true,
          result: `/result/${id}`,
        });
      })
      .catch((e) => {
        console.log('Sharp error', e);
        res.send({
          success: false,
          result: null,
        });
      });
  } catch (e) {
    console.log('Share error', e);
    res.send({
      success: false,
      result: `/result/${id}`,
    });
  }
});
app.use(`/${PREVIEW}`, Express.static(PREVIEW));

app.listen(PORT, () => console.log('LH Api Listening on port', PORT));
