/**
 * POST - login a user
 *
 * 1. Look up the user by email
 * 2. Check if emails is verified by checking if the ID is a negative number
 * 3. Check if password matches
 */
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { redis } = require('./helpers/redis');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const { successResponse, errorResponse } = require('./helpers');
const { emailsSortedSetKey, getUserKey } = require('./helpers/registration');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const data = JSON.parse(event.body);

  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  });

  try {
    const { email, password } = await schema.validateAsync(data);

    // Check if email exists
    const userId = await redis.zscore(emailsSortedSetKey, email);

    // Email is not found
    if (userId === null) return callback(null, unauthorizedResponse());

    // ID is a negative number
    if (userId < 0) {
      return callback(
        null,
        successResponse(200, { status: 'ok', message: 'Email is not verified' }),
      );
    }

    // Get the hash
    const hash = await redis.hget(getUserKey(userId), 'hash');

    // Check if password is correct
    const match = await bcrypt.compare(password, hash);

    // Wrong password
    if (!match) return callback(null, unauthorizedResponse());

    // Generate token
    const token = jwt.sign({ userId }, process.env.APP_SECRET);

    return callback(null, successResponse(200, { status: 'ok', token }));
  } catch (error) {
    await reportEvent(error);
    return callback(null, errorResponse());
  }
});
