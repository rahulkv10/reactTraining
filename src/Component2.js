import React, { useEffect } from "react";
import "./Component2.css";

export const Component2 = ({ randomTextList, onGenerateRandomText }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onGenerateRandomText();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onGenerateRandomText]); 
  return (
    <div className="component2-container">
      <h1 className="title">Random Texts</h1>
      <ul className="random-text-list">
        {randomTextList.map((text, index) => (
          <li className="random-text-item" key={index}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};
