import React, { Component } from "react";
import "./Component1.css";

export class Component1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "To Do Items",
      todoItems: [
        { text: "Drink Water" },
        { text: "Read Newspaper" },
        { text: "Do the Exercise" },
        { text: "Breakfast" },
        { text: "Read a Book" },
      ],
    };
  }

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
      <div className="component-container">
        <h1 className="title">{this.renderTitle()}</h1>
        <div className="dataSet">{this.renderTodoItems()}</div>
      </div>
    );
  }
}
