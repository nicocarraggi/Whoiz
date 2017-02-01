/**
 * EventInstanceController
 *
 * @description :: Server-side logic for managing eventinstances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	findOne: function(req,res) {
		EventInstance.findOne({
		  id:req.param('id')
		})
		.populate('going')
		.populate('mainevent')
		.exec(function (err, ei){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!ei) {
		    return res.notFound('Could not find eventInstance, sorry.');
		  }
			ei.isGoing = false;
			var userid = req.headers['userid'];
			if(ei.going.length>0){
				for (i = 0; i < ei.going.length; i++) {
			    var goingUserid = ei.going[i].id;
					if (goingUserid == userid){
						ei.isGoing = true;
					}
				}
			};
		  return res.json(ei);
		});
	},

	on: function(req,res) {
		var d = new Date(req.param('year'), req.param('month')-1, req.param('day'), 0, 0, 0, 0);
		var d1 = new Date(req.param('year'), req.param('month')-1, req.param('day'), 0, 0, 0, 0);
		d1.setDate(d1.getDate() + 1);
		var dayEventInstances = [];
		var userid = req.headers['userid'];
		User.findOne(userid)
		.populate('subscribedToGroups')
		.exec(function(err,user){
			if(err) sails.log.debug("EventInstance on User find err");
			var group;
			var groupids = [];
			// get eventInstances on day for every subscribed group
			if(user.subscribedToGroups.length>0){
				for (i = 0; i < user.subscribedToGroups.length; i++) {
					group = user.subscribedToGroups[i];
					groupids.push(group.id);
					// Group.findOne(group.id)
					// .populate('eventinstances',{
					// 		from: { '>': d, '<': d1 }
					// })
					// .exec(function(err,resgroup){
					// 	if(err) sails.log.debug("EventInstance on groupfind err");
					// 	sails.log.debug("EventInstance on groupfind succes! " + resgroup.eventinstances);
					//
					// 	var tempfrom;
					// 	var eiObj;
					// 	for (ei = 0; ei < resgroup.eventinstances.length; ei++) {
					// 		eiObj = resgroup.eventinstances[ei];
					// 		sails.log.debug("EventInstance on groupfind succes! eiObj "+eiObj.name +" on "+eiObj.from);
					// 		dayEventInstances.push(eiObj);
					// 		sails.log.debug("EventInstance on groupfind succes! dayEventInstances "+dayEventInstances.length);
					// 	}
					// })
				}
				sails.log.debug("EventInstance on groups found: "+groupids);

				EventInstance.find({
						from: { '>': d, '<': d1 },
						group: groupids
				})
				.populate('mainevent')
				.exec(function (err, records) {
					if(err) sails.log.debug("EventInstance on EventInstance find err");
					// add usergoing value
					// TODO improve performance! O(n*m) ...
					if(records.length>0){
						for (i = 0; i < records.length; i++) {
					    var ei = records[i];
							var userid = req.headers['userid'];
							ei.isGoing = false;
							for (ig = 0; ig < ei.goingids.length; ig++) {
								if(ei.goingids[ig]===userid){
									ei.isGoing = true;
								}
							}
						}
					};
					return res.json({"records":records});
				});

			} else {
				return res.json({"records":[]});
			}
		});
	},

	// !!!!!! manual filter ON DAY
	// 	tempfrom = eiObj.from;
	// 	if( (tempfrom.getTime() > d.getTime()) && (tempfrom.getTime() < d1.getTime())){
	// 		// eventInstance is TODAY !! now add isGoing boolean!
	// 		sails.log.debug("EventInstance on eiObj "+eiObj);
	// 		eiObj.isGoing = false;
	// 		for (ig = 0; ig < eiObj.goingids.length; ig++) {
	// 			if(eiObj.goingids[ig]===userid){
	// 				eiObj.isGoing = true;
	// 			}
	// 		}
	// 		sails.log.debug("EventInstance on eiObj after "+eiObj);
	// 		dayEventInstances.push(eiObj);
	// 	}
	// 	}

	//TODO filter on only the subscribed groups of the user !!!
	onAll: function(req,res) {
		// month 0 = January, so month-1!
		//var dj = new Date(req.param('dj'));
		var d = new Date(req.param('year'), req.param('month')-1, req.param('day'), 0, 0, 0, 0);
		var d1 = new Date(req.param('year'), req.param('month')-1, req.param('day'), 0, 0, 0, 0);
		d1.setDate(d1.getDate() + 1);
		//sails.log.debug("date d = "+d+" & d1 = "+d1+" & dj = "+dj);
		// Sort by name in descending order
		//Model.find({ where: { name: 'foo' }, sort: 'name DESC' });
		EventInstance.find({
				from: { '>': d, '<': d1 }
		})
		.populate('mainevent')
		.exec(function (err, records) {
			if(err) sails.log.debug("EventInstance onAll err");
			// add usergoing value
			// TODO improve performance! O(n*m) ...
			if(records.length>0){
				for (i = 0; i < records.length; i++) {
			    var ei = records[i];
					var userid = req.headers['userid'];
					ei.isGoing = false;
					for (ig = 0; ig < ei.goingids.length; ig++) {
						if(ei.goingids[ig]===userid){
							ei.isGoing = true;
						}
					}
				}
			};
			return res.json({"records":records});
		});
	},

	going: function(req,res) {
		EventInstance.findOne({id: req.param('eventinstanceid')})
		.exec(function (err, ei) {
			if (err) {
				return res.serverError(err);
			}
			//Check if user is already going?
			var going = false;
			var userid = req.headers['userid'];
			for (ig = 0; ig < ei.goingids.length; ig++) {
				if(ei.goingids[ig]===userid){
					going = true;
				}
			}
			if(!going){
				ei.going.add(userid);
				ei.goingids.push(userid);
	   		ei.save(function(err){
					if (err) {
						// TODO undo changes?
						return res.serverError(err);
					}
					return res.ok({going: true});
				});//</save()>
			} else {
				return res.ok({going: true});
			}
 		});
	},

	notgoing: function(req,res) {
		EventInstance.findOne({id: req.param('eventinstanceid')})
		.exec(function (err, ei) {
			if (err) {
				return res.serverError(err);
			}
			//Check if user is already going?
			var going = false;
			var userid = req.headers['userid'];
			for (ig = 0; ig < ei.goingids.length; ig++) {
				if(ei.goingids[ig]===userid){
					going = true;
				}
			}
			if(going){
				ei.going.remove(userid);
				ei.goingids.pop(userid);
	   		ei.save(function(err){
					if (err) {
						// TODO undo changes?
						return res.serverError(err);
					}
					return res.ok({going: false});
				});//</save()>
			} else {
				return res.ok({going: false});
			}
 		});
	},

};
