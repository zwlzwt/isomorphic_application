import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withState } from 'recompose';
import {
  addTodoMutation,
  clearTodoMutation,
  todoQuery,
} from '../../client/queries';

const TodoForm = ({
  currentTodos,
  addTodoMutation,
  clearTodoMutation,
  inputText,
  handleText,
}) => (
  <div>
    <input
      value={inputText}
      onChange={(e) => handleText(e.target.value)}
      />
    <ul>
    {
      currentTodos.map((item, index) => (<li key={index}>{item}</li>))
    }
    </ul>
    <button 
      onClick={() => {
        addTodoMutation({ variables: { item: inputText } })
        handleText('')
    }}>
      Add
    </button>
    <button 
      onClick={(e) => clearTodoMutation()}
    >
      clearAll
    </button>
  </div>
)

const maptodoQueryProps = {
  props: ({ ownProps, data: { currentTodos = [] } }) => ({
    ...ownProps,
    currentTodos,
  }),
};

export default compose(
  graphql(todoQuery, maptodoQueryProps),
  graphql(addTodoMutation, { name: 'addTodoMutation' }),
  graphql(clearTodoMutation, { name: 'clearTodoMutation' }),
  withState('inputText', 'handleText', ''),
)(TodoForm)
