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
const Sequelize = require('sequelize');

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

// 数据库链接
const userName = 'zwlzwt';
const dataBasePassword = '892110';
const sequelize = new Sequelize('users', userName, dataBasePassword, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const User = sequelize.define('my_bro', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

app.use(
  async(ctx, next) => {
    // force: true 如果表已经存在，将会丢弃表
    User.sync({ force: true }).then(() => {
      // 表已创建
      return User.create({
        firstName: 'John',
        lastName: 'Hancock'
      });
    });

    User.findAll().then(user => {
      console.log('fuck');
      console.log(user);
    });
    await next();
  }
)


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
