import React, { Component } from "react";
import "./Component2.css";

export class Component2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Random Texts",
      randomTextList: [], 
    };

    this.generateRandomText = this.generateRandomText.bind(this);
  }

  generateRandomText() {
    const length = Math.floor(Math.random() * (64 - 8 + 1)) + 8;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$$%^&*()_";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  componentDidMount() {
    console.log("print shshhshshshhs");

    setTimeout(() => {
      const randomTextList = Array.from({ length: 5 }, () =>
        this.generateRandomText()
      );
      this.setState({ randomTextList });
    }, 10000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.randomTextList !== this.state.randomTextList) {
      console.log("component updated.");
    }
  }

  componentWillUnmount() {
    console.log("Component is about to unmount.");
  }

  renderRandomTextList() {
    return this.state.randomTextList.map((text, index) => (
      <p className="random-text-item" key={index}>
        {text}
      </p>
    ));
  }

  render() {
    return (
      <div className="component2-container">
        <h1 className="title">Random Texts</h1>
        <button onClick={this.props.onGenerateRandomText}>Generate Random Texts</button>
        <ul className="random-text-list">
          {this.props.randomTextList.map((text, index) => (
            <li key={index} className="random-text-item">
              {text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
