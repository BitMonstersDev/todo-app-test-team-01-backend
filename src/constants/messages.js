const MESSAGES = {
  HEALTHY: 'Service is healthy',
  TODO_CREATED: 'Todo created successfully',
  TODO_UPDATED: 'Todo updated successfully',
  TODO_DELETED: 'Todo deleted successfully',
  TODO_COMPLETION_TOGGLED: 'Todo completion toggled successfully',
  INVALID_JSON: 'Request body must be valid JSON',
  UNKNOWN_ROUTE: 'Requested route does not exist',
  TITLE_REQUIRED: 'Title is required',
  TITLE_LENGTH: 'Title must be between 1 and 200 characters',
  INVALID_TODO_ID: 'Todo id must be a positive integer',
  INVALID_PAGE: 'page must be a positive integer',
  INVALID_LIMIT: 'limit must be a positive integer',
  LIMIT_TOO_HIGH: 'limit cannot be greater than 100',
  INVALID_SORT_BY: 'sortBy must be one of: id, title, completed, createdAt',
  INVALID_SORT_ORDER: 'sortOrder must be one of: asc, desc',
  TODO_NOT_FOUND: 'Todo not found',
};

module.exports = {
  MESSAGES,
};
