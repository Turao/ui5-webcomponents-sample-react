import React, { Component } from 'react';

import "@ui5/webcomponents-base/src/browsersupport/Edge";
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/Panel";

import './App.css';
import logo from './logo.png';

import TopBar from './components/TopBar';
import TodoList from './components/TodoList';

import * as _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: mockTodos,
    };
  }

  onAddTodo = todo => {
    const { todos } = this.state;
    todo.id = todos.length + 1;
    this.setState({todos: _.concat(todos, todo)})
    console.log(this.state.todos);
  }

  onTodoChanged = changedTodo => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map(todo => todo.id === changedTodo.id ? changedTodo : todo)
    })
  }

  onTodoDeletedFromTodoList = deletedTodo => {
    const { todos } = this.state;
    this.setState({todos: _.without(todos, deletedTodo)});
  }

  render() {
    const { todos } = this.state;
    const undone = todos.filter(todo => !todo.done);
    const done = todos.filter(todo => todo.done);

    return (
      <div className="app">
        <ui5-shellbar
          primary-title="UI5 Web Components React Sample Application"
          logo={logo}>
        </ui5-shellbar>
        <section className="app-content">

          <TopBar onAddTodo={this.onAddTodo.bind(this)}/>

          <div className="list-todos-wrapper">
            <ui5-panel
              header-text="Incomplete tasks"
              collapsed={undone.length === 0 || undefined}>
              <TodoList
                items={undone}
                onChange={this.onTodoChanged}
                onDelete={this.onTodoDeletedFromTodoList}
              />
            </ui5-panel>

            <ui5-panel
              header-text="Completed tasks"
              collapsed={done.length === 0 || undefined}>
              <TodoList
                items={done}
                onChange={this.onTodoChanged}
                onDelete={this.onTodoDeletedFromTodoList}
              />
            </ui5-panel>
          </div>

        </section>
        
      </div>
    );
  }
}

const mockTodos = [
  {
    text: "Get some carrots",
    id: 1,
    deadline: "27/7/2018",
    done: false
  },
  {
    text: "Do some magic",
    id: 2,
    deadline: "22/7/2018",
    done: false
  },
  {
    text: "Go to the gym",
    id: 3,
    deadline: "24/7/2018",
    done: true
  },
  {
    text: "Buy milk",
    id: 4,
    deadline: "30/7/2018",
    done: false
  },
  {
    text: "Eat some fruits",
    id: 5,
    deadline: "29/7/2018",
    done: false
  }
]

export default App;
