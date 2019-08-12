import React, { Component } from 'react'

import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/TextArea";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.todoDeadline = React.createRef();
    this.cancelButton = React.createRef();
    this.saveButton = React.createRef();
  }

  componentDidMount() {
    // register listeners
    this.cancelButton.current.addEventListener('press', 
      _ => this.onCancelButtonClicked()
    );

    this.saveButton.current.addEventListener('press', 
      _ => this.onSaveButtonClicked()
        
    );
  }

  onCancelButtonClicked = _ => this.props.onCancel();
  onSaveButtonClicked() {
    let { todo } = this.props;
    todo.text = this.textInput.current.getAttribute('value');
    todo.deadline = this.todoDeadline.current.getAttribute('value');
    this.props.onSave(todo);
  }

  render() {
    const { todo } = this.props;
    return (
      <React.Fragment>
        <div className="dialog-content">
          <div className="edit-wrapper">
              <ui5-label>Title:</ui5-label>
              <ui5-textarea
                class="title-textarea"
                max-length="24"
                show-exceeded-text
                value={todo.text}
                ref={this.textInput}/>
          </div>

          <div className="edit-wrapper date-edit-fields">
              <ui5-label>Date:</ui5-label>
              <ui5-datepicker
                format-pattern="dd/MM/yyyy"
                value={todo.deadline}
                ref={this.todoDeadline}/>
          </div>
        </div>

        <div className="dialog-footer" >
          <ui5-button type="Transparent" ref={this.cancelButton}>Cancel</ui5-button>
          <ui5-button type="Emphasized" ref={this.saveButton}>Save</ui5-button>
        </div>
      </React.Fragment>
    );
  }
}