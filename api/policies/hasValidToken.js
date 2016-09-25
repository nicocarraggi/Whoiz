/**
 * hasValidToken
 *
 * @module      :: Policy
 * @description :: Simple policy to check if the user has a valid token
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // TODO check client? log something? ...
  // android: 3rZGZWfB62LS1Xk0121McIyDDvQI0yC1
  // iOS: pc8T0c5hMdqWR08xjzp9U4d9U8KBkwd5
  // web: UNDX3eZ102Jl3xBw8F8uj6YC4fOL0F7v

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  User.findOne({"id":req.param('user_id'),
                "token":req.param('token')}).exec(function(err,user){
                  sails.log.debug("hasValidToken");
                  if (!err && user) {
                    next();
                  } else {
                    // User is not allowed
                    return res.send("You are not permitted to perform this action. (no valid token)", 403);
                  }
                });
};
