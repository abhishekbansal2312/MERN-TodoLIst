import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetch("http://localhost:4000/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  return (
    <div className="p-6  bg-gray-900 min-h-screen text-white">
      <Link to={`/todos/add`}>
        <button
          type="submit"
          className="bg-blue-600 my-5 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          Add a New Note
        </button>
      </Link>

      {todos.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link to={`/todos/${todo._id}`}>
                <h3 className="text-xl font-semibold mb-2 text-blue-400 hover:underline">
                  {todo.title}
                </h3>
              </Link>
              <p className="text-gray-400 mb-2">
                {todo.description.slice(0, 100)}
              </p>
              <p
                className={`text-lg ${
                  todo.completed ? "text-green-400" : "text-red-400"
                }`}>
                Status: {todo.completed ? "Completed" : "Not Completed"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Loading or no todos available...
        </p>
      )}
    </div>
  );
};

export default TodoList;
