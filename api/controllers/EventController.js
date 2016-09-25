/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req,res) {
		Event.create({
			name: req.param('name'),
			organizer: req.param('user_id')
		}, function eventCreated(err, newEvent){
			if(err){
				// TODO better way of handling err?
				sails.log.debug("Event create err");
				return res.send("Event create error.", 403);
			}
			return res.json({
				id: newEvent.id
			})
		})
	},

	allofuser: function(req,res) {
		User.findOne({id: req.param('user_id')})
		.populate('organizer')
		.exec(function (err, user) {
			sails.log.debug("Event allofuser"+user.events);
			if(err) sails.log.debug("Event allofuser err");
			return res.json(user.events);
		});
	},

	// TODO this is temporary for testing
	all: function(req,res) {
		Event.find()
		.populate('organizer')
		.exec(function (err, records) {
			sails.log.debug("Event all");
			if(err) sails.log.debug("Event all err");
			return res.json(records);
		});
	},

};
