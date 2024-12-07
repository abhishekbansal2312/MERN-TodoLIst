import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TodoItem = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Use navigate to handle redirection
  const [todo, setTodo] = useState(null); // State to store the todo item
  const [error, setError] = useState(null); // State to store any error
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedTitle, setEditedTitle] = useState(""); // State to store edited title
  const [editedDescription, setEditedDescription] = useState(""); // State to store edited description

  useEffect(() => {
    fetch(`http://localhost:4000/api/todos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTodo(data);
        setEditedTitle(data.title);
        setEditedDescription(data.description);
      })
      .catch((error) => {
        console.error("Error fetching the todo item:", error);
        setError(error);
      });
  }, [id]);

  if (error) {
    return (
      <p className="text-red-400 text-center">Error fetching the todo item.</p>
    );
  }

  if (!todo) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the todo item.");
      }
      console.log("Todo item deleted:", id);
      navigate("/"); // Redirect to the homepage after deletion
    } catch (error) {
      console.error("Error deleting the todo item.");
    }
  };

  const updateStatus = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to update the todo item.");
      }
      const data = await response.json();
      console.log("Todo item updated:", data);
      setTodo(data);
    } catch (error) {
      console.error("Error updating the todo item.");
    }
  };

  const editTodo = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit the todo item.");
      }
      const data = await response.json();
      console.log("Todo item edited:", data);
      setTodo(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing the todo item.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-screen-lg">
        <h1 className="text-2xl font-semibold mb-4 text-white">{todo.title}</h1>
        <p className="mb-2 text-gray-300">
          <strong>Status:</strong>{" "}
          <span className={todo.completed ? "text-green-400" : "text-red-400"}>
            {todo.completed ? "Completed" : "Not Completed"}
          </span>
        </p>
        <p className="mb-4 text-gray-400">
          <strong>Description:</strong> {todo.description}
        </p>
        <p className="mb-4 text-gray-500">
          <strong>Timestamp:</strong>{" "}
          {new Date(todo.timestamp).toLocaleString()}
        </p>

        {isEditing ? (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-yellow-300">Edit Todo</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-700 bg-gray-900 text-white rounded-md"
              placeholder="Edit Title"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-700 bg-gray-900 text-white rounded-md"
              rows="4"
              placeholder="Edit Description"
            />
            <div className="flex space-x-2">
              <button
                onClick={editTodo}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <button
                onClick={deleteTodo}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                Delete
              </button>
              <button
                onClick={updateStatus}
                className="bg-yellow-600 text-gray-900 py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-300">
                Status
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                Edit
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 max-w-56">
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
