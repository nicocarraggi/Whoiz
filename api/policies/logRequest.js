/**
 * logRequest
 *
 * @module      :: Policy
 * @description :: Simple policy to allow a registered client
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  sails.log("logRequest.js -> "+req.url);

};
