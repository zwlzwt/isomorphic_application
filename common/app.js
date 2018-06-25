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
import { ApolloProvider } from 'react-apollo';

import client from '../client/client.js'

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
