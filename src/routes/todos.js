const express = require('express');
const {
  listTodos,
  createTodo,
  updateTodo,
  toggleTodoCompletion,
  deleteTodo,
} = require('../controllers/todosController');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(listTodos));
router.post('/', asyncHandler(createTodo));
router.put('/:id', asyncHandler(updateTodo));
router.patch('/:id/complete', asyncHandler(toggleTodoCompletion));
router.delete('/:id', asyncHandler(deleteTodo));

module.exports = router;
