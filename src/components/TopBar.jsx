import React, { Component } from 'react'

import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";

export default class TopBar extends Component {
  constructor(props) {
    super(props);

    this.todoInput = React.createRef();
    this.todoDeadline = React.createRef();
    this.todoAddButton = React.createRef();
  }

  componentDidMount() {
    // register listeners
    this.todoInput.current.addEventListener('submit',
      _ => this.onAddTodo()
    );

    this.todoAddButton.current.addEventListener('press',
      _ => this.onAddTodo()
    );


    this.todoInput.current.addEventListener('change',
      _ => this.clearInputValidationState()
    );

    this.todoDeadline.current.addEventListener('change',
      _ => this.clearDatePickerValidationState()
    );
  }

  clearInputValidationState() {
    this.todoInput.current.setAttribute('value-state', 'None')
  }

  clearDatePickerValidationState() {
    this.todoDeadline.current.setAttribute('value-state', 'None')
  }

  onAddTodo() {
    console.log('creating todo');
    const text = this.todoInput.current.getAttribute('value');    
    const deadline = this.todoDeadline.current.getAttribute('value');
    
    const todo = {
      text,
      deadline,
      done: false
    }

    console.log('adding todo', todo);
    this.props.onAddTodo(todo);
  }

  render() {
    return (
      <div className="create-todo-wrapper">
        <ui5-input
          placeholder="My Todo ..."
          ref={this.todoInput}
          class="add-todo-element-width"
          id="add-input"/>

        <ui5-datepicker
          format-pattern="dd/MM/yyyy"
          class="add-todo-element-width"
          ref={this.todoDeadline}
          id="date-picker"/>

        <ui5-button
          class="add-todo-element-width"
          ref={this.todoAddButton}
          type="Emphasized"
        >
          Add Todo
        </ui5-button>
      </div>
    )
  }
}