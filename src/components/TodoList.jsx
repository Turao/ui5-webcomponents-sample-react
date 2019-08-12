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
    this.props.onChange(changedTodo); // lift state
  }

  onTodoDeleted = deletedTodo => {
    this.props.onDelete(deletedTodo); // lift state
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