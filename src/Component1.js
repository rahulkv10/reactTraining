import React from "react";
import "./Component1.css"; 

export function Component1() {
  const title = "To Do Items";

  const sampleData = [
    "Drink Water",
    "Read newspaper",
    "Do the Exercise",
    "Breakfast",
    "Read a book",
  ];

  function getSampleData() {
    return sampleData.map((data, index) => {
      return (
        <div className="item-card" key={index}>
          {data}
        </div>
      );
    });
  }

  function getHeading() {
    return title;
  }

  return (
    <div className="component-container">
      <h1 className="title">{getHeading()}</h1>
      <div className="dataSet">{getSampleData()}</div>
    </div>
  );
}
