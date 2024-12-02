import React, { Component } from "react";
import "./Component1.css";

export class Component1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
    };
  }

  handleInputChange = (value) => {
    this.setState({ newTodo: value.target.value });
  };
sjsj//
  handleAdd = () => {
    if (this.state.newTodo.trim()) {
      this.props.onAddTodo(this.state.newTodo);
      this.setState({ newTodo: "" });
    }
  };

  componentDidMount() {
    console.log("Component has mounted.");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoItems !== this.state.todoItems) {
      console.log("Todo items have been updated.");
    }
  }

  componentWillUnmount() {
    console.log("Component is about to unmount.");
  }

  renderTodoItems() {
    return this.state.todoItems.map((item, index) => (
      <div className="item-card" key={index}>
        {item.text}
      </div>
    ));
  }

  renderTitle() {
    return this.state.title;
  }

  render() {
    return (
      <div className="component1-container">
        <h1 className="title">TODO List</h1>
        <ul className="todo-list">
          {this.props.todoItems.map((item, index) => (
            <li key={index} className="todo-item">
              <span>{item.text}</span>
              <button onClick={() => this.props.onDeleteTodo(index)}>Delete</button>
              <button
                onClick={() =>
                  this.props.onEditTodo(
                    index,
                    prompt("Edit TODO:", item.text) || item.text
                  )
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <div className="add-todo">
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            placeholder="Add a new TODO"
          />
          <button onClick={this.handleAdd}>Add</button>
        </div>
      </div>
    );
  }
}
