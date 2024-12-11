import React from "react";

const AllTodos = ({ todos, setTodos }) => {
  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h2>All Todos</h2>
      {todos.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
              />
              {todo.task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllTodos;
