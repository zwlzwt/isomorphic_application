import { createStore, applyMiddleware, compose } from 'redux';
import api from './reduxMiddleware/fetch';
import rootReducer from './reducers';

const middlewares = [ api ];

const composeEnhancers = process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = (initialState={}) => {
  const getStore = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));
  return getStore;
};

export default store;
