import React, { useState, useEffect } from "react";
import { Component1 } from "./Component1";
import { Component2 } from "./Component2";

export const ParentComponent = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [randomTextList, setRandomTextList] = useState([]);
  const [useLocalStorage, setUseLocalStorage] = useState(true);

  useEffect(() => {
    const storage = useLocalStorage ? localStorage : sessionStorage;
    const savedTodos = storage.getItem("todoItems");
    if (savedTodos) {
      setTodoItems(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    const storage = useLocalStorage ? localStorage : sessionStorage;
    storage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems, useLocalStorage]);

  const handleStorageToggle = () => {
    setUseLocalStorage((prev) => !prev);
  };

  const handleAddTodo = (newTodo) => {
    setTodoItems([...todoItems, newTodo]);
  };

  const handleEditTodo = (index, updatedTodo) => {
    const updatedTodos = [...todoItems];
    updatedTodos[index] = updatedTodo;
    setTodoItems(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    setTodoItems(todoItems.filter((_, i) => i !== index));
  };

  const handleGenerateRandomText = () => {
    const generateRandomText = () => {
      const length = Math.floor(Math.random() * (64 - 8 + 1)) + 8;
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$$%^&*()_";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    setRandomTextList(Array.from({ length: 5 }, () => generateRandomText()));
  };

  return (
    <div className="parent-container">
      <div className="storage-toggle">
        <label>
          <input
            type="checkbox"
            checked={useLocalStorage}
            onChange={handleStorageToggle}
          />
          Persist Data in LocalStorage
        </label>
      </div>
      <Component1
        todoItems={todoItems}
        onAddTodo={handleAddTodo}
        onDeleteTodo={handleDeleteTodo}
        onEditTodo={handleEditTodo}
      />
      <Component2
        randomTextList={randomTextList}
        onGenerateRandomText={handleGenerateRandomText}
      />
    </div>
  );
};
