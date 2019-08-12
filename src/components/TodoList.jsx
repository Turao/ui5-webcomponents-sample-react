import React, { Component } from 'react';
import * as _ from 'lodash';

import "@ui5/webcomponents/dist/List";
import TodoItem from './TodoItem';


export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  onTodoChanged = changedTodo => {
    const todos = this.props.items;
    const updatedTodos = todos.map(todo => {
      if (todo.id === changedTodo.id) todo = changedTodo;
      return todo;
    });
    this.props.onChange(updatedTodos); // lift state
  }

  onTodoDeleted = deletedTodo => {
    const todos = this.props.items;
    this.props.onChange(_.without(todos, deletedTodo)); // lift state
  }

  render() {
    const todos = this.props.items;
    return (
      <ui5-list
        id="todo-list"
        mode="MultiSelect"
        ref={this.ref}
        no-data-text="No Data Available"
      >
      {
        todos.map(todo => {
          return <TodoItem
            key={todo.id}
            todo={todo}
            onChange={this.onTodoChanged}
            onDelete={this.onTodoDeleted}
          />
        })
      }
    </ui5-list>
    );
  }
}