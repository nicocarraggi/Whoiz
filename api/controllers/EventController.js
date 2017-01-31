/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req,res) {
		Event.create({
			organiser: req.param('organiser'),
			group: req.param('group'),
			name: req.param('name'),
			description: req.param('description'),
			location: req.param('location'),
			occurence: req.param('occurence'),
			from: req.param('from'),
			until: req.param('until')
		}, function eventCreated(err, newEvent){
			if(err){
				// TODO better way of handling err?
				sails.log.debug("Event create err "+err.status);
				return res.send("Event create error.", 403);
			}
			// make eventInstance
			// TODO temporary make ONLY one-time events
			EventInstance.create({
				from: newEvent.from,
				until: newEvent.until,
				mainevent: newEvent.id
			}, function eventInstanceCreated(err, newEventInstance){
				if(err){
					// TODO better way of handling err?
					sails.log.debug("EventInstance create err "+err.status);
					return res.send("EventInstance create error.", 403);
				}
				return res.json({
					id: newEvent.id
				});
			});
		})
	},



	allofuser: function(req,res) {
		User.findOne({id: req.param('user_id')})
		.populate('organizer')
		.exec(function (err, user) {
			sails.log.debug("Event allofuser"+user.events);
			if(err) sails.log.debug("Event allofuser err");
			return res.json({"records":user.events});
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
