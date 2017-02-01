/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string',
      required: true
    },

    // TODO change to real location object !!
    location: {
      type: 'string',
      required: true
    },

    isPublic: {
      type: 'boolean',
      required: true,
      defaultsTo: true
    },

    // derived value when a user (with id) asks for groups!
    // is set when a user gets his groups in GroupController!
    // NOT SAVED IN DATABASE (directly)
    isOwner: {
      type: 'boolean'
    },

    // additional info

    color: {
      type: 'string'
    },

    externalUrl: {
      type: 'string'
    },

    // ---------
    // RELATIONS
    // ---------

    owner: { // TODO extend to multiple owners? or co-workers collection
      model:'user'
    },

    subscriberids: {
      type: 'array',
      defaultsTo: []
    },

    subscribers: {
      collection: 'user',
      via: 'subscribedToGroups',
      dominant: true // TODO really needed?! and correct?!
    },

    events: {
      collection: 'event',
      via: 'group'
    },

    eventinstances: {
      collection: 'eventInstance',
      via: 'group'
    },

    beforeCreate: function (values, cb) {
      // remove isOwner (temporary user-specific value)
      var obj = this.toObject();
      delete obj.isOwner;
    },

    beforeUpdate: function (values, cb) {
      // remove isOwner (temporary user-specific value)
      var obj = this.toObject();
      delete obj.isOwner;
    }

  }
};
