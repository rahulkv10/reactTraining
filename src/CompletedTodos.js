import React from "react";

const CompletedTodos = ({ todos }) => {
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      <h2>Completed Todos</h2>
      {completedTodos.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        <ul>
          {completedTodos.map((todo) => (
            <li key={todo.id}>{todo.task}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTodos;
