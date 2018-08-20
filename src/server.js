import Express from 'express';
import fs from 'fs';

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

app.use('/result/:url', (req, res) => {
  console.log('req.params.uid', req.params.url);
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
    <meta property="og:image" content=${content.ogImage} />
    <meta name="twitter:card" content=${content.twitterCard} />
    <meta name="twitter:title" content=${content.twitterTitle} />
    <meta name="twitter:image" content=${content.twitterImage} />
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

app.use(Express.static('dist'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
