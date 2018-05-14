const devMiddleware = require('webpack-dev-middleware');

module.exports = (compiler, option) => {
  const expressMiddleware = devMiddleware(compiler, option);

  const koaMiddleware = async (ctx, next) => {
    const { req } = ctx;
    // 修改res的兼容方法
    const runNext = await expressMiddleware(ctx.req, {
      end(content) {
        ctx.body = content;
      },
      locals: ctx.state,
      setHeader(name, value) {
        ctx.set(name, value);
      }
    }, next);
  };

// 把webpack-dev-middleware的方法属性拷贝到新的对象函数
  Object.keys(expressMiddleware).forEach(p => {
    koaMiddleware[p] = expressMiddleware[p];
  });

  return koaMiddleware
}
