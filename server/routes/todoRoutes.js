const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
  updateTodoStatus,
} = require("../controllers/todoController");

// Define routes
router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodoStatus);
router.get("/:id", getTodoById); // Ensure this route is defined
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
