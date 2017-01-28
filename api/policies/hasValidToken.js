/**
 * hasValidToken
 *
 * @module      :: Policy
 * @description :: Simple policy to check if the user has a valid token
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  User.findOne({"id":req.headers['userid'],
                "token":req.headers['token']}).exec(function(err,user){
                  //sails.log.debug("hasValidToken");
                  if (!err && user) {
                    next();
                  } else {
                    // User is not allowed
                    return res.send("You are not authorized to perform this action. (no valid token)", 401);
                  }
                });
};
