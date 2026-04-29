const { HTTP_STATUS } = require('../constants/http');
const { MESSAGES } = require('../constants/messages');
const todosService = require('../services/todosService');
const {
  parseTodoId,
  validateCreateTodoBody,
  validateUpdateTodoBody,
  validateListQuery,
} = require('../validators/todoValidator');

function listTodos(req, res) {
  const query = validateListQuery(req.query);
  const result = todosService.listTodos(query);
  return res.status(HTTP_STATUS.OK).json(result);
}

function createTodo(req, res) {
  const payload = validateCreateTodoBody(req.body);
  const createdTodo = todosService.createTodo(payload);

  return res.status(HTTP_STATUS.CREATED).json({
    message: MESSAGES.TODO_CREATED,
    data: createdTodo,
  });
}

function updateTodo(req, res) {
  const id = parseTodoId(req.params.id);
  const payload = validateUpdateTodoBody(req.body);
  const updatedTodo = todosService.updateTodo(id, payload);

  return res.status(HTTP_STATUS.OK).json({
    message: MESSAGES.TODO_UPDATED,
    data: updatedTodo,
  });
}

function toggleTodoCompletion(req, res) {
  const id = parseTodoId(req.params.id);
  const updatedTodo = todosService.toggleTodoCompletion(id);

  return res.status(HTTP_STATUS.OK).json({
    message: MESSAGES.TODO_COMPLETION_TOGGLED,
    data: updatedTodo,
  });
}

function deleteTodo(req, res) {
  const id = parseTodoId(req.params.id);
  todosService.deleteTodo(id);

  return res.status(HTTP_STATUS.OK).json({
    message: MESSAGES.TODO_DELETED,
  });
}

module.exports = {
  listTodos,
  createTodo,
  updateTodo,
  toggleTodoCompletion,
  deleteTodo,
};
