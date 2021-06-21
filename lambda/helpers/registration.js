/**
 * Key schema for user hash
 *
 * { id } - user id
 */
exports.getUserKey = id => `user:${id}`;

/**
 * Key schema for email sorted set
 */
exports.emailsSortedSetKey = 'emails';

/**
 * Key for storing sequential ids
 */
exports.userIDsKey = 'user_ids'
