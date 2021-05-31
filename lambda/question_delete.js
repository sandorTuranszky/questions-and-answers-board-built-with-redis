/**
 * DELETE - delete question
 * 
 * 1. Delete the hash key
 * 2. Remove the questions from the following sorted sets:
 *  2.1 getQuestionsKey(boardID)
 *  2.2 getQuestionsByTimeKey(boardID)
 *  2.3 getAnsweredQuestionsKey(boardID)
 *
 */
const Joi = require('joi');
const { redis } = require('./helpers/redis');
const { successResponse, errorResponse } = require('./helpers');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const { getQuestionKey, getQuestionsKey, getQuestionsByTimeKey, getAnsweredQuestionsKey, defaultBoardID } = require('./helpers/qa');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    boardID: Joi.string().optional(),
  });

  try {
    const { id, boardID = defaultBoardID } = await schema.validateAsync(event.queryStringParameters);
    
    await redis
      .multi()
      .del(getQuestionKey(id))
      .zrem(getQuestionsKey(boardID), id)
      .zrem(getQuestionsByTimeKey(boardID), id)
      .zrem(getAnsweredQuestionsKey(boardID), id)
      .exec();

    return callback(null, successResponse(200, { status: 'ok' }));
  } catch (error) {
    await reportEvent(error);
    return callback(null, errorResponse(400));
  }
});
