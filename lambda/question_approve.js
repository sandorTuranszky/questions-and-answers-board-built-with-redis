/**
 * PATCH - approve a question
 *
 * 1. Find question by id to get its "datetime"
 * 2. Update the score for a question from 0 to 1 - content moderation (approved)
 * 3. Add the question to a sorted set with "datetime" as key to have it sorted by time
 */
const Joi = require('joi');
const { redis } = require('./helpers/redis');
const { successResponse, errorResponse } = require('./helpers');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const {
  getQuestionKey,
  getQuestionsKey,
  getQuestionsByTimeKey,
  defaultBoardID,
} = require('./helpers/qa');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const data = JSON.parse(event.body);

  const schema = Joi.object({
    id: Joi.string().required(),
    boardID: Joi.string().optional(),
  });

  try {
    const { id, boardID = defaultBoardID } = await schema.validateAsync(data);
    const questionKey = getQuestionKey(id);
    const datetime = await redis.hget(questionKey, 'datetime');

    await redis
      .multi()
      .hincrby(questionKey, 'score', 1) //increment "score" in hash
      .zadd(getQuestionsKey(boardID), 1, id)
      .zadd(getQuestionsByTimeKey(boardID), datetime, id)
      .exec();

    return callback(null, successResponse(200, { status: 'ok' }));
  } catch (error) {
    await reportEvent(error);
    return callback(null, errorResponse(400));
  }
});
