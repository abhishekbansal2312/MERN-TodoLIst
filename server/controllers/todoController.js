const Todo = require("../models/Todo");

// Fetch all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

const updateTodoStatus = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating todo", error });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body; // Extract data from the request body

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const newTodo = new Todo({
      title,
      description,
      completed: false, // Default value for new todos
    });

    const savedTodo = await newTodo.save(); // Save the new todo to the database

    res.status(201).json(savedTodo); // Respond with the newly created todo
  } catch (error) {
    console.error("Error creating todo:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create todo", error: error.message });
  }
};

// Update an existing todo
const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating todo", error });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (deletedTodo) {
      res.json({ message: "Todo deleted" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};

// Fetch a single todo by ID

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo item", error });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
  updateTodoStatus,
};
