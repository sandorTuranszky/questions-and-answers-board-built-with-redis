/**
 * PUT/PATCH - update a question
 *
 * 1. Get the score of a question
 * 2. Update the hash with the question adding the url value
 * 3. Add question ID to the "questions:${boardID}:answered" sorted set
 *
 */
const Joi = require('joi');
const { redis } = require('./helpers/redis');
const { successResponse, errorResponse } = require('./helpers');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const {
  getQuestionKey,
  getQuestionsKey,
  getAnsweredQuestionsKey,
  defaultBoardID,
} = require('./helpers/qa');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const data = JSON.parse(event.body);

  const schema = Joi.object({
    id: Joi.string().required(),
    url: Joi.string().required(),
    boardID: Joi.string().optional(),
  });

  try {
    const { id, url, boardID = defaultBoardID } = await schema.validateAsync(data);
    const score = await redis.zscore(getQuestionsKey(boardID), id);

    await redis
      .multi()
      .hset(getQuestionKey(id), 'url', url)
      .zadd(getAnsweredQuestionsKey(boardID), score, id)
      .exec();

    return callback(null, successResponse(200, { status: 'ok' }));
  } catch (error) {
    await reportEvent(error);
    return callback(null, errorResponse(400));
  }
});