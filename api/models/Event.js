/**
 * Event.js
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

    location: { // TODO change location to REAL location object for Google Maps
      type: 'string',
      required: true
    },

    isPublic: {
      type: 'boolean',
      required: true
    },

    isLocked: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },

    isWithSelection: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },

    // 0 = One time
    // 1 = Weekly
    // 2 = Monthly
    occurence: {
      type: 'integer',
      required: true
    },

    from: {
      type: 'date',
      required: true
    },

    until: {
      type: 'date',
      required: true
    },

    organiser: {
      model:'user'
    },

    group: {
      model: 'group'
    },

    participants: {
      collection: 'participant',
      via: 'partEvent'
    }

  }
};
