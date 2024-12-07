import React, { useState } from "react";

const TodoAdd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch("http://localhost:4000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new todo.");
      }

      const data = await response.json();
      console.log("New todo created:", data);
      // Optionally, clear the form after successful submission
      setTitle("");
      setDescription("");
      //redirect to the home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Add New Todo
        </h2>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update state on input change
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Description"
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-blue-500"
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update state on input change
            required></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoAdd;
