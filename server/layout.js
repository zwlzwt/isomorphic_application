const Production = process.env.NODE_ENV === 'production';

module.exports = function renderFullPage(html, initialState) {
  html.scriptUrl = Production ? '' : '/bundle.js';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1">
        <meta httpEquiv='Cache-Control' content='no-siteapp' />
        <meta name='renderer' content='webkit' />
        <meta name='keywords' content='demo' />
        <meta name="format-detection" content="telephone=no" />
        <meta name='description' content='demo' />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <title>${html.title}</title>
      </head>
      <body>
        <div id="root">${html.body}</div>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src=${html.scriptUrl}></script>
      </body>
    </>
  `
}
