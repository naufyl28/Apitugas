const express = require("express");
const route = express.Router();

const {
  createTodo,
  getAllTodo,
  getTodoById,
  editTodoById,
  deleteTodoById,
  deleteAllTodo,
} = require("../controllers/todo-controller.js");

route.get("/", getAllTodo);
route.get("/:id", getTodoById);
route.post("/", createTodo);
route.put("/:id", editTodoById);
route.delete("/", deleteAllTodo);
route.delete("/:id", deleteTodoById);

module.exports = route;
