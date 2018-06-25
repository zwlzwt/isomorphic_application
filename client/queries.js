import gql from 'graphql-tag';

const todoQuery = gql`
  query GetTodo {
    currentTodos @client
  }
`;

const clearTodoMutation = gql`
  mutation ClearTodo {
    clearTodo @client
  }
`;

const addTodoMutation = gql`
  mutation addTodo($item: String) {
    addTodo(item: $item) @client
  }
`;

export {
  todoQuery,
  clearTodoMutation,
  addTodoMutation,
}