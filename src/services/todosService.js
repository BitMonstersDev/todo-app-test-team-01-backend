const store = require('../store');
const { paginate } = require('../utils/paginate');
const { sortItems } = require('../utils/sort');
const { buildNotFoundError } = require('../validators/todoValidator');

function listTodos({ page, limit, sortBy, sortOrder }) {
  const todos = store.getAll();
  const sortedTodos = sortItems(todos, { sortBy, sortOrder });
  return paginate(sortedTodos, { page, limit });
}

function createTodo({ title }) {
  return store.create(title);
}

function updateTodo(id, { title }) {
  const updated = store.update(id, { title });
  if (!updated) {
    throw buildNotFoundError();
  }

  return updated;
}

function toggleTodoCompletion(id) {
  const existing = store.getById(id);
  if (!existing) {
    throw buildNotFoundError();
  }

  return store.update(id, { completed: !existing.completed });
}

function deleteTodo(id) {
  const removed = store.remove(id);
  if (!removed) {
    throw buildNotFoundError();
  }
}

module.exports = {
  listTodos,
  createTodo,
  updateTodo,
  toggleTodoCompletion,
  deleteTodo,
};
