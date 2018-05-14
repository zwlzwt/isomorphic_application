const { StaticRouter, matchPath } = require('react-router-dom');
const { routes, staticPrefix } = require('../common/dom');
const streamToPromise = require('stream-to-promise');
const getStore = require('../common/store').default;
const ReactDOMServer = require('react-dom/server');
const App = require('../common/dom').default;
const { Provider } = require('react-redux');
const renderFullPage = require('./layout');
const { Helmet } = require('react-helmet');
const Stream = require('stream');
const React = require('react');
// api前缀
const apiPrefix = '/api';

module.exports = function(app, options={}) {
  // 页面router设置
  app.get(`${staticPrefix}/*`, async (ctx, next) => {
    const store = getStore();
    const helmet = Helmet.renderStatic();
    const context = {};
    options.title = helmet.title;

    const promises = routes.map(
      route => {
        const match = matchPath(ctx.path, route);
        if (match) {
          let serverFetch = route.component.loadData
          return serverFetch(store.dispatch)
        }
      }
    )

    const serverStream = await Promise.all(promises)
    .then(
      () => {
        return ReactDOMServer.renderToNodeStream(
          <Provider store={store}>
            <StaticRouter
              location={ctx.url}
              context={context}
              >
              <App/>
            </StaticRouter>
          </Provider>
        );
      }
    );

    console.log(serverStream.readable);
    await streamToPromise(serverStream).then(
      (data) => {
        options.body = data.toString();
        if (context.status === 301 && context.url) {
          ctx.status = 301;
          ctx.redirect(context.url);
          return ;
        }

        if (context.status === 404) {
          ctx.status = 404;
          ctx.body = renderFullPage(options, store.getState());
          return ;
        }
        ctx.status = 200;
        ctx.set({
          'Content-Type': 'text/html; charset=utf-8'
        });
        ctx.body = renderFullPage(options, store.getState());
    })
    // console.log(serverStream instanceof Stream);
    await next();
  });

  // api路由
  app.get(`${apiPrefix}/user/info`, async(ctx, next) => {
    ctx.body = {
      code: 10000,
      msg: '',
      data: {
        name: '赵玮龙',
        age: 29,
      }
    }
    await next();
  });

  app.get(`${apiPrefix}/home/info`, async(ctx, next) => {
    ctx.body = {
      code: 10000,
      msg: '',
      data: {
        title: '你要的网站',
        content: '那些年我想过的女孩~',
      }
    }
  })
}
