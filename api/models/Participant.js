/**
 * Participant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user: {
      model:'user',
      unique: true
    },

    partEvent: { // TODO gives problem when called 'event' ?
      model: 'event'
    }

    // TODO hold extra information: evaluation, ...

  }
};
