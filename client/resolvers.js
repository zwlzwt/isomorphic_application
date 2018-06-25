import {
  todoQuery,
} from './queries';

const todoDefaults = {
  currentTodos: []
};

const addTodoResolver = (_obj, { item }, { cache }) => {
  const { currentTodos } = cache.readQuery({ query: todoQuery });
  const updatedTodos = currentTodos.concat(item);
  
  cache.writeQuery({
    query: todoQuery, 
    data: { currentTodos: updatedTodos }
  });
  return null;
};

const clearTodoResolver = (_obj, _args, { cache }) => {
  cache.writeQuery({
    query: todoQuery,
    data: todoDefaults
  });
  return null;
};

export {
  addTodoResolver,
  clearTodoResolver,
  todoDefaults,
}