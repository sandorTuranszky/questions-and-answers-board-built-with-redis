/**
 * POST - register a new user
 *
 * 1. Check if email is not registered already
 * 2. Generate unique user id
 * 3. Hash the provided password
 * 4. Store user details in a hash
 * 5. Add user email to a sorted set with id being the score represented as a negative number to mark an email as unverified.
 *    When email is verified, the score is turned into positive by removing the minus.
 */
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { redis } = require('./helpers/redis');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const { successResponse, errorResponse, toNegative } = require('./helpers');
const { emailsSortedSetKey, getUserKey, userIDsKey } = require('./helpers/registration');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const data = JSON.parse(event.body);

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(20)
      .required(),
    repeat_password: Joi.ref('password'),
  }).with('password', 'repeat_password');

  try {
    const { name, email, password } = await schema.validateAsync(data);

    // Check if email exists
    const emailIsTaken = await redis.zscore(emailsSortedSetKey, email);

    // Email exists
    if (emailIsTaken) {
      return callback(
        null,
        successResponse(200, { status: 'ok', msg: 'Email is already registered' }),
      );
    }

    // 1. Generate user ID
    // 2. Generate password hash
    const [userId, hash] = await Promise.all([redis.incr(userIDsKey), bcrypt.hash(password, 10)]);

    await redis
      .multi()
      // Store user details in hash.
      .hmset(getUserKey(userId), { userId, name, email, hash })
      // Store user email in a sorted set with user ID as a score converted to a negative number (email unverified).
      .zadd(emailsSortedSetKey, toNegative(userId), email)
      .exec();

    return callback(null, successResponse(200, { status: 'ok' }));
  } catch (error) {
    await reportEvent(error);
    return callback(null, errorResponse());
  }
});
