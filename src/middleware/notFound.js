const { HTTP_STATUS } = require('../constants/http');
const { ERROR_CODES } = require('../constants/errorCodes');
const { MESSAGES } = require('../constants/messages');

function notFound(req, res) {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    error: {
      code: ERROR_CODES.ROUTE_NOT_FOUND,
      message: MESSAGES.UNKNOWN_ROUTE,
    },
  });
}

module.exports = {
  notFound,
};
