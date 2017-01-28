/**
* EventInstance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    from: {
      type: 'date',
      required: true
    },

    until: {
      type: 'date',
      required: true
    },

    isLocked: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },

    message: {
      type: 'string'
    },

    // derived value when a user (with id) asks for eventinstances!
    // is set when a user gets his eventinstances in EventInstanceController!
    // NOT SAVED IN DATABASE (directly)
    usergoing: {
      type: 'boolean'
    },

    // ---------
    // RELATIONS
    // ---------

    mainevent: {
      model:'event'
    },

    goingids: {
      type: 'array',
      defaultsTo: []
    },

    going: {
      collection: 'user',
      via: 'goesTo'
    },

    participants: {
      collection: 'participant',
      via: 'ofEvent'
    },

    beforeCreate: function (values, cb) {
      // remove usergoing (temporary user-specific value)
      var obj = this.toObject();
      delete obj.usergoing;
    },

    beforeUpdate: function (values, cb) {
      // remove usergoing (temporary user-specific value)
      var obj = this.toObject();
      delete obj.usergoing;
    }

  }
};
