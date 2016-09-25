/**
 * GroupController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req,res) {
		Group.create({
			name: req.param('name'),
			isPublic: req.param('isPublic'),
			owner: req.param('user_id')
		}, function eventCreated(err, newGroup){
			if(err){
				// TODO better way of handling err?
				sails.log.debug("Group create err");
				return res.send("Group create error.", 403);
			}
			return res.json({
				id: newGroup.id
			})
		})
	},

	allofuser: function(req,res) {
		User.findOne({id: req.param('user_id')})
		.populate('ownerOfGroups')
		.exec(function (err, user) {
			sails.log.debug("Group allofuser"+user.ownerOfGroups);
			if(err) sails.log.debug("Group allofuser err");
			return res.json(user.ownerOfGroups);
		});
	},

	// TODO this is temporary for testing
	all: function(req,res) {
		Group.find()
		.populate('owner')
		.exec(function (err, records) {
			sails.log.debug("Group all");
			if(err) sails.log.debug("Group all err");
			return res.json(records);
		});
	},

};
