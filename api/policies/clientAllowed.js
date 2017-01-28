/**
 * clientAllowed
 *
 * @module      :: Policy
 * @description :: Simple policy to allow a registered client
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // Client is allowed if it's key is one of the following:
  // android: 3rZGZWfB62LS1Xk0121McIyDDvQI0yC1
  // iOS: pc8T0c5hMdqWR08xjzp9U4d9U8KBkwd5
  // web: UNDX3eZ102Jl3xBw8F8uj6YC4fOL0F7v

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  //if (req.param('clientkey') == '3rZGZWfB62LS1Xk0121McIyDDvQI0yC1') {
  if (req.headers['clientkey'] == '3rZGZWfB62LS1Xk0121McIyDDvQI0yC1') {
    // android client !!
    //sails.log.debug("android client");
    return next();
  }

  // NOT A SUPPORTED CLIENT !!

  // Client is not allowed
  return res.send("You are not permitted to perform this action. Client error!", 403);
};
