import React, { Component } from "react";
import { Component1 } from "./Component1";
import { Component2 } from "./Component2";

export class ParentComponent extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      todoItems: [], // TODO list items
      randomTextList: [], // Random text list
      useLocalStorage: true, // Determines where to store TODOs
    };
  }

  // Lifecycle method: Load initial TODOs from storage
  componentDidMount() {
    const storedTodos = this.getTodosFromStorage();
    if (storedTodos) {
      this.setState({ todoItems: storedTodos });
    }
  }

  // Helper method: Get TODOs from the chosen storage
  getTodosFromStorage = () => {
    const storage = this.state.useLocalStorage ? localStorage : sessionStorage;
    const storedData = storage.getItem("todos");
    return storedData ? JSON.parse(storedData) : [];
  };

  // Helper method: Save TODOs to the chosen storage
  saveTodosToStorage = (todos) => {
    const storage = this.state.useLocalStorage ? localStorage : sessionStorage;
    storage.setItem("todos", JSON.stringify(todos));
  };

  // Add a new TODO
  handleAddTodo = (newTodo) => {
    const updatedTodos = [...this.state.todoItems, { text: newTodo }];
    this.setState({ todoItems: updatedTodos }, () => {
      this.saveTodosToStorage(updatedTodos);
    });
  };

  // Delete a TODO by index
  handleDeleteTodo = (index) => {
    const updatedTodos = this.state.todoItems.filter((_, i) => i !== index);
    this.setState({ todoItems: updatedTodos }, () => {
      this.saveTodosToStorage(updatedTodos);
    });
  };

  // Edit a TODO by index
  handleEditTodo = (index, updatedText) => {
    const updatedTodos = this.state.todoItems.map((item, i) =>
      i === index ? { text: updatedText } : item
    );
    this.setState({ todoItems: updatedTodos }, () => {
      this.saveTodosToStorage(updatedTodos);
    });
  };

  // Generate random text list
  handleGenerateRandomText = () => {
    const randomTextList = Array.from({ length: 5 }, () =>
      this.generateRandomText()
    );
    this.setState({ randomTextList });
  };

  // Helper method: Generate random text
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

  // Toggle storage between LocalStorage and SessionStorage
  handleStorageToggle = () => {
    this.setState(
      (prevState) => ({ useLocalStorage: !prevState.useLocalStorage }),
      () => {
        // Move data to the new storage location
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

        {/* TODO Component */}
        <Component1
          todoItems={this.state.todoItems}
          onAddTodo={this.handleAddTodo}
          onDeleteTodo={this.handleDeleteTodo}
          onEditTodo={this.handleEditTodo}
        />

        {/* Random Text Component */}
        <Component2
          randomTextList={this.state.randomTextList}
          onGenerateRandomText={this.handleGenerateRandomText}
        />
      </div>
    );
  }
}
