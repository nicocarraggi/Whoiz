/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// TODO effectively check if the Facebook token is a valid token!!
	facebookLogin: function(req, res) {
		User.findOne({"fbid":req.param('fbid')}).exec(
			function(err, user){
				sails.log.debug("User facebookLogin");
				if (err) {
					// TODO better way of handling err?
					sails.log.debug("User facebookLogin err");
					return res.send("facebook login error.", 403);
				} else if (!err && user) {

					// -------------
					// Existing user
					// -------------

					// update token etc.
					sails.log.debug("User facebookLogin existing user");

					User.update({fbid: req.param('fbid')},{
						token: req.param('token'),
						lastLoggedIn: new Date()}).exec(
							function userUpdated(err, updatedUsers){
								if (!err && updatedUsers) {
									return res.json({
										id: updatedUsers[0].id
									});
								} else {
									// TODO better way of handling err?
									sails.log.debug("User facebookLogin userUpdated err");
									return res.send("facebook login user updated error.", 403);
								}
							}
						);
				}	else {
					sails.log.debug("User facebookLogin new user "+req.param('fbid')+req.param('token')+req.param('name'));

					// --------
					// New user
					// --------

					User.create({
						fbid: req.param('fbid'),
						name: req.param('name'),
						//email: req.param('email'),
						token: req.param('token'),
						lastLoggedIn: new Date()
					}, function userCreated(err, newUser) {
						if (err) {
							// TODO better way of handling err?
							sails.log.debug("User facebookLogin userCreated err "+err.status);
							return res.send("facebook login user created error.", 403);
						} else if (!err && newUser) {
							sails.log.debug("User facebookLogin user created");
							return res.json({
				        id: newUser.id
				      });
						} else {
							// TODO better way of handling else?
							sails.log.debug("facebookLogin userCreated else");
							return res.send("facebook login user created else error.", 403);
						}
					});
				}
			}
		)
	}

};
