/**
* EventInstance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    message: {
      type: 'string'
    },

    from: {
      type: 'date',
      required: true
    },

    until: {
      type: 'date',
      required: true
    },

    // ---------
    // RELATIONS
    // ---------

    mainevent: {
      model:'event'
    },

    participants: {
      collection: 'participant',
      via: 'ofEvent'
    }

  }
};
