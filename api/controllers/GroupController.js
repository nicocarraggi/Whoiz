/**
 * GroupController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req,res) {
		sails.log.debug("group create allParams: ");
		sails.log.debug(req.allParams());
		sails.log.debug("body = "+req.body);
		sails.log.debug("name = "+req.param('name'));
		sails.log.debug("description = "+req.param('description'));
		sails.log.debug("location = "+req.param('location'));
		sails.log.debug("isPublic = "+req.param('isPublic'));


		Group.create({
			name: req.param('name'),
			description: req.param('description'),
			location: req.param('location'),
			isPublic: req.param('isPublic'),
			owner: req.headers['userid']
		}, function eventCreated(err, newGroup){
			if(err){
				// TODO better way of handling err?
				sails.log.debug("Group create err");
				return res.send("Group create error.", 403);
			}
			// add owner in subscribers
			newGroup.subscribers.add(req.param('owner'));
			newGroup.save(function(err){
				if (err) {
					// TODO undo changes?
					return res.serverError(err);
				}
				return res.json({
					id: newGroup.id
				});
			});//</save()>
		})
	},

	publicgroups: function(req,res) {
		Group.find({isPublic: true,
								owner: { '!' : req.headers['userid'] }})
		.exec(function (err, records) {
			sails.log.debug("Group publicgroups");
			if(err) sails.log.debug("Group publicgroups err");
			return res.json({"records":records});
		});
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

	subscribe: function(req,res) {
		Group.findOne(req.param('groupid')).exec(function (err, group) {
			if (err) {
				return res.serverError(err);
			}
			group.subscribers.add(req.headers['userid']);
			group.save(function(err){
				if (err) {
					// TODO undo changes?
					return res.serverError(err);
				}
				return res.ok();
			});//</save()>
		});
	},

	unsubscribe: function(req,res) {
		Group.findOne(req.param('groupid')).exec(function (err, group) {
			if (err) {
				return res.serverError(err);
			}
			group.subscribers.remove(req.headers['userid']);
			group.save(function(err){
				if (err) {
					// TODO undo changes?
					return res.serverError(err);
				}
				return res.ok();
			});//</save()>
		});
	},

	// TODO this is temporary for testing
	all: function(req,res) {
		Group.find()
		.populate('subscribers')
		.exec(function (err, records) {
			sails.log.debug("Group all");
			if(err) sails.log.debug("Group all err");
			return res.json(records);
		});
	},

};
