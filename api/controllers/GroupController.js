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
			newGroup.subscribers.add(req.headers['userid']);
			newGroup.subscriberids.push(req.headers['userid']);
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

	// returns all the public groups, that are not owned by the user
	// and on which the user is not yet subscribed
	discover: function(req,res) {
		Group.find({isPublic: true,
								owner: { '!' : req.headers['userid'] }})
		.exec(function (err, records) {
			sails.log.debug("Group discover");
			if(err) sails.log.debug("Group discover err");

			// filter out groups on which user is already subscribed...
			// TODO bad performance ... O(m*n)
			var filteredrecords = [];
			if(records.length>0){
				for (i = 0; i < records.length; i++) {
					var gr = records[i];
					var userid = req.headers['userid'];
					var subscribed = false;
					// set subscribed to true if subscriberids contains userid!
					for (ig = 0; ig < gr.subscriberids.length; ig++) {
						if(gr.subscriberids[ig]===userid){
							subscribed = true;
						}
					}
					// if not subscribed, add to filteredrecords
					if(!subscribed){
						filteredrecords.push(gr);
					}
				}
			};
			return res.json({"records":filteredrecords});
		});
	},

	subscribed: function(req,res) {
		User.findOne({id: req.headers['userid']})
		.populate('subscribedToGroups')
		.exec(function (err, user) {
			sails.log.debug("Group subscribed "+user);
			if(err) sails.log.debug("Group subscribed err");
			return res.json({"records" :user.subscribedToGroups});
		});
	},

	allofuser: function(req,res) {
		User.findOne({id: req.headers['userid']})
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
			group.subscriberids.push(req.headers['userid']);
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
			group.subscriberids.pop(req.headers['userid']);
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
