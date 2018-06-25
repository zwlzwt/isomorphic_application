import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  addTodoResolver,
  clearTodoResolver,
  todoDefaults,
} from './resolvers';

const preloadedState = window.__INITIAL_STATE__;
// redux state
// const store = getStore(preloadedState);
// delete window.__INITIAL_STATE__;

const cache = new InMemoryCache().restore(preloadedState)

// Set up Local State
const stateLink = withClientState({
  cache,
  defaults: todoDefaults,
  resolvers: {
    Mutation: {
      addTodo: addTodoResolver,
      clearTodo: clearTodoResolver,
    },
  },
});

// graphql state
const client = new ApolloClient({
  cache: new InMemoryCache().restore(preloadedState),
  ssrMode: true,
  connectToDevTools: true,
  link: ApolloLink.from([
    stateLink,
    new createHttpLink({
      uri: '/graphql'
    })
  ])
});

export default client
