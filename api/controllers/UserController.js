/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	all: function(req,res) {
		User.find()
		.populate('ownerOfGroups')
		.exec(function (err, records) {
			sails.log.debug("User all");
			if(err) sails.log.debug("User all err");
			return res.json(records);
		});
	}

};
