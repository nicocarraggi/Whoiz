/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    fbid: {
      type: 'integer',
      required: true
    },

    // The user's full name
    name: {
      type: 'string',
      required: true
    },

    token: {
      type: 'string',
      required: true
    },

    // The timestamp when the the user last logged in
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    // ---------
    // RELATIONS
    // ---------

    subscribedToGroups: {
      collection: 'group',
      via: 'subscribers'
    },

    ownerOfGroups: {
      collection: 'group',
      via: 'owner'
    },

    organiserOfEvents: {
      collection: 'event',
      via: 'organiser'
    },

    goesTo: {
      collection: 'eventInstance',
      via: 'going'
    },

    participatesTo: {
      collection: 'participant',
      via: 'user'
    },

    // TODO temporary disabled for debugging
    // toJSON: function() {
    //   var obj = this.toObject();
    //   delete obj.token;
    //   return obj;
    // }

  }
};

// // The user's email address
// // e.g. nikola@tesla.com
// email: {
//   type: 'email',
//   required: true,
//   unique: true
// },
