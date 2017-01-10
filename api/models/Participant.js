/**
 * Participant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // ---------
    // RELATIONS
    // ---------

    user: {
      model:'user',
      via:'participatesTo',
      unique: true
    },

    ofEvent: {
      model: 'eventInstance'
    }

    // TODO hold extra information: evaluation, ...

  }
};
