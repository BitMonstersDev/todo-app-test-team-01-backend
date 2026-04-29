const { HTTP_STATUS, DEFAULT_PAGINATION, ALLOWED_SORT_FIELDS, ALLOWED_SORT_ORDERS } = require('../constants/http');
const { ERROR_CODES } = require('../constants/errorCodes');
const { MESSAGES } = require('../constants/messages');
const { TODO_TITLE } = require('../constants/todo');
const AppError = require('../errors/AppError');

function buildValidationError(message, details) {
  return new AppError({
    statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    code: ERROR_CODES.VALIDATION_ERROR,
    message,
    details,
  });
}

function parseTodoId(id) {
  const parsedId = Number.parseInt(id, 10);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw buildValidationError(MESSAGES.INVALID_TODO_ID, { field: 'id' });
  }

  return parsedId;
}

function validateTitle(title) {
  if (typeof title !== 'string') {
    throw buildValidationError(MESSAGES.TITLE_REQUIRED, { field: 'title' });
  }

  const normalizedTitle = title.trim();
  if (
    normalizedTitle.length < TODO_TITLE.MIN_LENGTH ||
    normalizedTitle.length > TODO_TITLE.MAX_LENGTH
  ) {
    throw buildValidationError(MESSAGES.TITLE_LENGTH, {
      field: 'title',
      min: TODO_TITLE.MIN_LENGTH,
      max: TODO_TITLE.MAX_LENGTH,
    });
  }

  return normalizedTitle;
}

function validateCreateTodoBody(body) {
  if (!body || typeof body !== 'object') {
    throw buildValidationError(MESSAGES.TITLE_REQUIRED, { field: 'title' });
  }

  return {
    title: validateTitle(body.title),
  };
}

function validateUpdateTodoBody(body) {
  if (!body || typeof body !== 'object') {
    throw buildValidationError(MESSAGES.TITLE_REQUIRED, { field: 'title' });
  }

  return {
    title: validateTitle(body.title),
  };
}

function validateListQuery(query) {
  const page =
    query.page === undefined ? DEFAULT_PAGINATION.PAGE : Number.parseInt(query.page, 10);
  const limit =
    query.limit === undefined ? DEFAULT_PAGINATION.LIMIT : Number.parseInt(query.limit, 10);
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder || 'desc';

  if (!Number.isInteger(page) || page <= 0) {
    throw buildValidationError(MESSAGES.INVALID_PAGE, { field: 'page' });
  }

  if (!Number.isInteger(limit) || limit <= 0) {
    throw buildValidationError(MESSAGES.INVALID_LIMIT, { field: 'limit' });
  }

  if (limit > DEFAULT_PAGINATION.MAX_LIMIT) {
    throw buildValidationError(MESSAGES.LIMIT_TOO_HIGH, {
      field: 'limit',
      max: DEFAULT_PAGINATION.MAX_LIMIT,
    });
  }

  if (!ALLOWED_SORT_FIELDS.includes(sortBy)) {
    throw buildValidationError(MESSAGES.INVALID_SORT_BY, {
      field: 'sortBy',
      allowed: ALLOWED_SORT_FIELDS,
    });
  }

  if (!ALLOWED_SORT_ORDERS.includes(sortOrder)) {
    throw buildValidationError(MESSAGES.INVALID_SORT_ORDER, {
      field: 'sortOrder',
      allowed: ALLOWED_SORT_ORDERS,
    });
  }

  return {
    page,
    limit,
    sortBy,
    sortOrder,
  };
}

function buildNotFoundError() {
  return new AppError({
    statusCode: HTTP_STATUS.NOT_FOUND,
    code: ERROR_CODES.TODO_NOT_FOUND,
    message: MESSAGES.TODO_NOT_FOUND,
  });
}

module.exports = {
  parseTodoId,
  validateCreateTodoBody,
  validateUpdateTodoBody,
  validateListQuery,
  buildNotFoundError,
};
