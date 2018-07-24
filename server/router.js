import koaPlayground from 'graphql-playground-middleware-koa';
import { StaticRouter, matchPath } from 'react-router-dom';
import { routes, staticPrefix } from '../common/dom';
import streamToPromise from 'stream-to-promise';
// import getStore from '../common.store';
import ReactDOMServer from 'react-dom/server';
import { importSchema } from 'graphql-import';
import App from '../common/dom';
import renderFullPage from './layout';
import { Helmet } from 'react-helmet';
import Stream from 'stream';
import React from 'react';
import path from 'path';
import fs from 'fs';

// apollo模块替代redux
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { ApolloClient } from 'apollo-client';

// apollo grahql操作模块
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlKoa } from 'apollo-server-koa';

// redux
// const { Provider } = require('react-redux');
// const getStore = require('../common/store').default;


// api前缀
const apiPrefix = '/api';

// 引入schema
let typeDefs;
const pathName = './server/schema/schema.graphql';

if (typeof pathName === 'string' && pathName.endsWith('graphql')) {
  const schemaPath = path.resolve(pathName);
  typeDefs = importSchema(schemaPath);
};


// resolvers
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Love GraphQL'
},
{
  id: 'link-002',
  url: 'www.howtographql.com',
  description: 'Love GraphQL'
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `respect all, fear none!`,
    feed: () => links,
    name: () =>  `赵玮龙`,
    age: () =>  29
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    deleteLink: (root, args) => {
      return links.filter(item => item.id !== args.id)
    }
  }
}

// 生成schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// 路由
module.exports = function(app, options={}) {
  // 页面router设置
  app.get(`${staticPrefix}/*`, async (ctx, next) => {
    // graphql接口设置
    const client = new ApolloClient({
      link: new SchemaLink({ schema }),
      ssrMode: true,
      connectToDevTools: true,
      cache: new InMemoryCache(),
    })

    const helmet = Helmet.renderStatic();
    const context = {};
    options.title = helmet.title;

    // restful api redux数据源
    // const store = getStore();
    // const promises = routes.map(
    //   route => {
    //     const match = matchPath(ctx.path, route);
    //     if (match) {
    //       let serverFetch = route.component.loadData
    //       return serverFetch(store.dispatch)
    //     }
    //   }
    // )

    // const serverStream = await Promise.all(promises)
    // .then(
    //   () => {
    //     return ReactDOMServer.renderToNodeStream(
    //       <Provider store={store}>
    //         <StaticRouter
    //           location={ctx.url}
    //           context={context}
    //           >
    //           <App/>
    //         </StaticRouter>
    //       </Provider>
    //     );
    //   }
    // );

    // graphql提取数据并且渲染dom
    const Html = (
      <ApolloProvider client={client}>
        <StaticRouter
          location={ctx.url}
          context={context}
          >
          <App/>
        </StaticRouter>
      </ApolloProvider>
    );
    const serverStream = await getDataFromTree(Html).then(() => ReactDOMServer.renderToNodeStream(Html));
    // console.log(serverStream.readable);
    await streamToPromise(serverStream).then(
      (data) => {
        options.body = data.toString();
        if (context.status === 301 && context.url) {
          ctx.status = 301;
          ctx.redirect(context.url);
          return ;
        }
        // 把store.getState()替换成client.extract()
        if (context.status === 404) {
          ctx.status = 404;
          ctx.body = renderFullPage(options, client.extract());
          return ;
        }
        ctx.status = 200;
        ctx.set({
          'Content-Type': 'text/html; charset=utf-8'
        });
        ctx.body = renderFullPage(options, client.extract());
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
    await next();
  });

  // 设置调试GraphQL-playground
  app.all('/graphql/playground', koaPlayground({
      endpoint: '/graphql',
    })
  );

  // GraphQl api
  app.all('/graphql', graphqlKoa({ schema }));
}
