/**
 * PATCH - upvote a question
 *
 * 1. Check if the question exists in the "questions:{boardID}:answered" sorted set (has been answered - voting is disabled for such answers)
 * 1.1. If so, return;
 * 1.2. Else:
 * 1.2.1 Increment score in hash
 * 1.2.2 Increment score in sorted set
 *
 */
const Joi = require('joi');
const { redis } = require('./helpers/redis');
const { successResponse, errorResponse } = require('./helpers');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const { getQuestionKey, getQuestionsKey, getAnsweredQuestionsKey, defaultBoardID } = require('./helpers/qa');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const data = JSON.parse(event.body);

  const schema = Joi.object({
    id: Joi.string().required(),
    boardID: Joi.string().optional(),
  });

  try {
    const { id, boardID = defaultBoardID } = await schema.validateAsync(data);
    
    const score = await redis.zscore(getAnsweredQuestionsKey(boardID), id);
    if (score) return callback(null, successResponse(200, { status: 'ok', score }));

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
