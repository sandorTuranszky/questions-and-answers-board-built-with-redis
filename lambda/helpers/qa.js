const { chunk, fromPairs, omit } = require('lodash');
const { v4: uuidv4 } = require('uuid');

exports.defaultBoardID = 'YkDN_Oz';

exports.defaultAuthor = 'Anonymous';

/**
 * Generate and shorten random id
 */
exports.getRandomId = function() {
  let hexString = uuidv4().replace('-', '');
  return Buffer.from(hexString, 'hex').toString('base64');
};

/**
 * Key schema for question hash
 *
 * { id } - question id
 */
exports.getQuestionKey = id => `question:${id}`;

/**
 * Key schema for questions set
 *
 * { id } - board id
 */
exports.getQuestionsKey = id => `questions:${id}`;

/**
 * Key schema for questions set sorted by time
 *
 * { id } - board id
 */
exports.getQuestionsByTimeKey = id => `questions:${id}:time`;

/**
 * Key schema for answered questions set
 *
 * { id } - board id
 */
exports.getAnsweredQuestionsKey = id => `questions:${id}:answered`;

/**
 * Flatten response structure
 * [[null, 'OK'], [null, 'bar']] -> ['OK', 'bar']
 *
 * arr - multidimensional structure from ioredis
 */
exports.flattenResponse = (arr, remove = []) =>
  arr
    .flat()
    .filter(el => Array.isArray(el) && el.length)
    .map(item => omit(fromPairs(chunk(item, 2)), remove));
