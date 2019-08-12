import React, { Component } from 'react';
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/Button";
import EditTodo from './EditTodo';


export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditComponent: false
    };

    // create references to DOM elements that need interaction
    this.ref = React.createRef();
    this.editButton = React.createRef();
    this.deleteButton = React.createRef();
  }

  componentDidMount() {
    const { todo } = this.props;

    // register listeners
    this.ref.current.addEventListener('_press', 
      _ => this.onToggleStatus(todo)
    );

    this.editButton.current.addEventListener('press', 
      _ => this.toggleEditComponent()
    );

    this.deleteButton.current.addEventListener('press',
    _ => this.onDeleteButtonClicked(todo)
    );
  }

  onToggleStatus = todo => {
    todo.done = !todo.done;
    this.props.onChange(todo); // lift state
  }
  
  toggleEditComponent = _ => {
    const { showEditComponent } = this.state;
    this.setState({showEditComponent: !showEditComponent})
  }

  onDeleteButtonClicked = todo => this.props.onDelete(todo); // lift state
  
  onTodoEdited = todo => {
    this.toggleEditComponent();
    this.props.onChange(todo); // lift state
  };

 
  render() {
    const { todo } = this.props;
    const { showEditComponent } = this.state; 
    return (
      <React.Fragment>
        <ui5-li-custom
        id={todo.id}
        key={todo.id}
        ref={this.ref}
        selected={todo.done || undefined}
        class={todo.hidden ? 'hidden' : ''}
      >
        <div className="li-content">
          <span className="li-content-text">{todo.text} | finish until {todo.deadline}</span>
          <div className="li-content-actions">
                <ui5-button ref={this.editButton}>
                  Edit
                </ui5-button>
                <ui5-button ref={this.deleteButton} type="Negative">
                  Delete
                </ui5-button>
            </div>
        </div>
      </ui5-li-custom>
      
      { 
        showEditComponent 
        ? <EditTodo 
            todo={todo}
            onCancel={this.toggleEditComponent}
            onSave={this.onTodoEdited}/> 
        : null
      }

    </React.Fragment>

    );
  }
}