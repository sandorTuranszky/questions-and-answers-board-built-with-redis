const jwt = require('jsonwebtoken');

const getOneDayExpTime = function() {
  return Math.floor(Date.now() / 1000) + 60 * 60;
};

const getToken = function(data, exp = getOneDayExpTime(), secret = process.env.JWT_SECRET) {
  return jwt.sign({ exp, data }, secret);
};

const decodeToken = function(token, secret = process.env.JWT_SECRET) {
  return jwt.verify(token, secret, function(err, decoded) {
    return { err, decoded };
  });
};

exports.getDataFromToken = function(token) {
  return decodeToken(token);
};

// Helper to compose the data object
exports.composeData = function({ email }) {
  return {
    email,
    confirmed: false,
    token: getToken({ email }),
  };
};

// Helper to check if email was sent successfully
exports.dataSaved = function(response) {
  return response && response.ref;
};

// Helper to compose an success response
exports.successResponse = function(statusCode = 200, message = null) {
  message = message || { success: true };
  return {
    statusCode,
    body: JSON.stringify(message),
  };
};

// Helper to compose an error response
exports.errorResponse = function(statusCode = 400, error = { message: 'Something went wrong' }) {
  return {
    statusCode,
    body: JSON.stringify(error),
  };
};

// Helper to compose an Unauthorized response
exports.unauthorizedResponse = function(
  statusCode = 401,
  error = { message: 'Wrong email or password' },
) {
  return {
    statusCode,
    body: JSON.stringify(error),
  };
};

// Helper to convert a positive number to negative
exports.toNegative = function(nom) {
  return -Math.abs(nom);
};

// Helper to convert a negative number to positive
exports.toPositive = function(nom) {
  return Math.abs(nom);
};
