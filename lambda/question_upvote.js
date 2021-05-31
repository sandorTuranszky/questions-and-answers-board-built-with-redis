/**
 * PATCH - upvote a question
 *
 */
const Joi = require('joi');
const { redis } = require('./helpers/redis');
const { successResponse, errorResponse } = require('./helpers');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const { getQuestionKey, getQuestionsKey, defaultBoardID } = require('./helpers/qa');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const data = JSON.parse(event.body);

  const schema = Joi.object({
    id: Joi.string().required(),
    boardID: Joi.string().optional(),
  });

  try {
    const { id, boardID = defaultBoardID } = await schema.validateAsync(data);

    const [hincrby] = await redis
      .multi()
      .hincrby(getQuestionKey(id), 'score', 1) // increment "score" in hash
      .zincrby(getQuestionsKey(boardID), 1, id)
      .exec();

    const [, count] = hincrby;

    return callback(null, successResponse(200, { status: 'ok', count }));
  } catch (error) {
    await reportEvent(error);
    return callback(null, errorResponse(400));
  }
});
