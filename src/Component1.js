import React, { useState } from "react";
import "./Component1.css";

export const Component1 = ({ todoItems, onAddTodo, onDeleteTodo, onEditTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      onAddTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="component1-container">
      <h1 className="title">To Do Items</h1>
      <div className="todo-list">
        {todoItems.map((item, index) => (
          <div className="todo-item" key={index}>
            <span>{item}</span>
            <button onClick={() => onDeleteTodo(index)}>Delete</button>
            <button
              onClick={() => {
                const updatedTodo = prompt("Edit TODO", item);
                if (updatedTodo) {
                  onEditTodo(index, updatedTodo);
                }
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};
