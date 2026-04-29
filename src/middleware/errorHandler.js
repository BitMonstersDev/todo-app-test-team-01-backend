const { HTTP_STATUS } = require('../constants/http');
const { ERROR_CODES } = require('../constants/errorCodes');
const { MESSAGES } = require('../constants/messages');
const AppError = require('../errors/AppError');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: {
        code: ERROR_CODES.BAD_REQUEST,
        message: MESSAGES.INVALID_JSON,
      },
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
  }

  console.error(err);
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred',
    },
  });
}

module.exports = {
  errorHandler,
};
