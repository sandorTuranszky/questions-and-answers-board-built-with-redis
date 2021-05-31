/**
 * GET endpoint to fetch unapproved questions
 */
const Joi = require('joi');
const { redis } = require('./helpers/redis');
const { successResponse, errorResponse } = require('./helpers');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const {
  getQuestionKey,
  getQuestionsKey,
  defaultBoardID,
  flattenResponse,
} = require('./helpers/qa');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const schema = Joi.object({
    boardID: Joi.string().optional(),
  });

  try {
    const { boardID = defaultBoardID } = await schema.validateAsync(event.queryStringParameters);
    const keys = await redis.zrangebyscore(getQuestionsKey(boardID), 0, 0, 'WITHSCORES');

    await redis.multi({ pipeline: false });

    keys.forEach(function(key) {
      redis.hgetall(getQuestionKey(key));
    });

    const result = await redis.exec();

    return callback(null, successResponse(200, flattenResponse(result)));
  } catch (error) {
    await reportEvent(error);
    return callback(null, errorResponse(400));
  }
});
