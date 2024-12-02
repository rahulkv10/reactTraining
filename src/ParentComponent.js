import React, { Component } from "react";
import { Component1 } from "./Component1";
import { Component2 } from "./Component2";

export class ParentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: [], 
      randomTextList: [], 
      useLocalStorage: true, 
    };
  }

  componentDidMount() {
    const storedTodos = this.getTodosFromStorage();
    if (storedTodos) {
      this.setState({ todoItems: storedTodos });
    }
  }

  getTodosFromStorage = () => {
    const storage = this.state.useLocalStorage ? localStorage : sessionStorage;
    const storedData = storage.getItem("todos");
    return storedData ? JSON.parse(storedData) : [];
  };

  saveTodosToStorage = (todos) => {
    const storage = this.state.useLocalStorage ? localStorage : sessionStorage;
    storage.setItem("todos", JSON.stringify(todos));
  };

  handleAddTodo = (newTodo) => {
    const updatedTodos = [...this.state.todoItems, { text: newTodo }];
    this.setState({ todoItems: updatedTodos }, () => {
      this.saveTodosToStorage(updatedTodos);
    });
  };

  handleDeleteTodo = (index) => {
    const updatedTodos = this.state.todoItems.filter((_, i) => i !== index);
    this.setState({ todoItems: updatedTodos }, () => {
      this.saveTodosToStorage(updatedTodos);
    });
  };

  handleEditTodo = (index, updatedText) => {
    const updatedTodos = this.state.todoItems.map((item, i) =>
      i === index ? { text: updatedText } : item
    );
    this.setState({ todoItems: updatedTodos }, () => {
      this.saveTodosToStorage(updatedTodos);
    });
  };

  handleGenerateRandomText = () => {
    const randomTextList = Array.from({ length: 5 }, () =>
      this.generateRandomText()
    );
    this.setState({ randomTextList });
  };

  generateRandomText = () => {
    const length = Math.floor(Math.random() * (64 - 8 + 1)) + 8;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$$%^&*()_";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  handleStorageToggle = () => {
    this.setState(
      (prevState) => ({ useLocalStorage: !prevState.useLocalStorage }),
      () => {
        this.saveTodosToStorage(this.state.todoItems);
      }
    );
  };

  render() {
    return (
      <div className="parent-container">
        <div className="storage-toggle">
          <label>
            <input
              type="checkbox"
              checked={this.state.useLocalStorage}
              onChange={this.handleStorageToggle}
            />
            Persist Data in LocalStorage
          </label>
        </div>

        <Component1
          todoItems={this.state.todoItems}
          onAddTodo={this.handleAddTodo}
          onDeleteTodo={this.handleDeleteTodo}
          onEditTodo={this.handleEditTodo}
        />


        <Component2
          randomTextList={this.state.randomTextList}
          onGenerateRandomText={this.handleGenerateRandomText}
        />
      </div>
    );
  }
}
