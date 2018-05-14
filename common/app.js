import '@babel/polyfill';
import App from './dom';
import React from 'react';
import getStore from './store';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/errorBoundary'
import { BrowserRouter } from 'react-router-dom';

const preloadedState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const store = getStore(preloadedState)

const render = () => {
  const rootDom = document.getElementById('root')
  ReactDOM.hydrate(
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>,
    rootDom
  );
};

document.addEventListener('DOMContentLoaded', render);
