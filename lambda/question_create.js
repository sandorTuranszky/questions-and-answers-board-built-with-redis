/**
 * POST - create a question
 *
 * 1. Store question in a hash
 * 2. Store question id in sorted set
 */
const Joi = require('joi');
const moment = require('moment');
const { redis } = require('./helpers/redis');
const { successResponse, errorResponse } = require('./helpers');
const { catchEvents, reportEvent } = require('./helpers/sentry');
const {
  getRandomId,
  getQuestionKey,
  defaultAuthor,
  defaultBoardID,
  getQuestionsKey,
} = require('./helpers/qa');

module.exports.handler = catchEvents(async (event, _context, callback) => {
  const data = JSON.parse(event.body);

  const schema = Joi.object({
    question: Joi.string().required(),
    author: Joi.string()
      .optional()
      .empty('')
      .default(defaultAuthor),
    email: Joi.string()
      .optional()
      .email()
      .allow(''),
    boardID: Joi.string().optional(),
  });

  const id = getRandomId();
  const key = getQuestionKey(id);
  const datetime = moment().unix();
  const score = 0; // stands for a number of votes

  try {
    const { question, email, author, boardID = defaultBoardID } = await schema.validateAsync(data);

    await redis
      .multi()
      .hmset(key, { id, datetime, question, author, email, score }) // the score is also stored in hash
      .zadd(getQuestionsKey(boardID), score, id)
      .exec();

    return callback(null, successResponse(201, { status: 'ok' }));
  } catch (error) {
    await reportEvent(error);
    return callback(null, errorResponse(400));
  }
});
