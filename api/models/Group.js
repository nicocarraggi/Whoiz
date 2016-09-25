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

    isPublic: {
      type: 'boolean',
      required: true
    },

    // ---------
    // RELATIONS
    // ---------

    owner: { // TODO extend to multiple owners? or co-workers collection
      model:'user'
    },

    subribers: {
      collection: 'user',
      via: 'subscribedToGroups',
      dominant: true // TODO really needed?! and correct?!
    },

    events: {
      collection: 'event',
      via: 'group'
    },

    // additional info

    color: {
      type: 'string'
    },

    externalUrl: {
      type: 'string'
    }

  }
};
