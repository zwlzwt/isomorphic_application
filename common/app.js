import '@babel/polyfill';
import App from './dom';
import React from 'react';
import getStore from './store';
import ReactDOM from 'react-dom';
// redux provider
// import { Provider } from 'react-redux';
import ErrorBoundary from './components/errorBoundary'
import { BrowserRouter } from 'react-router-dom';

// grapql provider
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";

const preloadedState = window.__INITIAL_STATE__;
// redux state
// const store = getStore(preloadedState);
// delete window.__INITIAL_STATE__;

// graphql state
const client = new ApolloClient({
  cache: new InMemoryCache().restore(preloadedState),
  ssrMode: true,
  connectToDevTools: true,
  link: new createHttpLink({
    uri: '/graphql'
  })
});

const render = () => {
  const rootDom = document.getElementById('root')
  ReactDOM.hydrate(
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ApolloProvider>
    </ErrorBoundary>,
    rootDom
  );
};

document.addEventListener('DOMContentLoaded', render);
