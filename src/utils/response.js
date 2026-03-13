/**
 *
 * @param {*} res
 * @param {*} statusCode
 * @param {*} message
 * @param {*} data
 * @param {{}} meta
 * @returns
 */

const sendResponse = (res, statusCode, message, data = null, meta = {}) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    statusCode,
    message: message || (statusCode < 400 ? "Success" : "Error"),
    data,
    ...meta, // pagination, errors, etc.
  });
};

module.exports = sendResponse;
