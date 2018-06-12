require('@babel/register');
require('@babel/polyfill');
const koa = require('koa');
const webpack = require('webpack');
const logger = require('koa-logger');
const Router = require('koa-router');
const config = require('./webpack.config');
const appRouter = require('./server/router');
const webpackDevMiddleware = require('./middleware/koa-middleware-dev');
const bodyparser = require('koa-bodyparser');

const router = new Router();
const app = new koa();

// const Production = process.env.NODE_ENV === 'production';

const compiler = webpack(config);
// 替换
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// logger记录
app.use(logger());

// parser body
app.use(bodyparser());


// 静态资源托管
// const assetsPath = path.join(__dirname, '/client/dist')
// app.use(staticDir(assetsPath));

// 路由设置
app.use(router.routes())
   .use(router.allowedMethods());

appRouter(router);


// http服务端口监听
app.listen(4000, ()=> {
  console.log('4000 is listening!');
});
