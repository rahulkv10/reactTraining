import React, { useState } from "react";

const AddTodo = ({ todos, setTodos }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    const newTodo = { id: Date.now(), task, completed: false };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  return (
    <div>
      <h2>Add TODO</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddTodo;
