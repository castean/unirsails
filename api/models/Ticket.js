/* eslint-disable camelcase */
/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
  identity: 'Ticket',
  tableName: 'tickets',

  attributes: {
    soporte_clv: { type: 'string', allowNull: true },
    email: { type: 'string'},
    descripcion: { type: 'string', required: true },
    respuesta: { type: 'string', required: false },
    status: { type: 'boolean', required: true },
    closed_at: { type: 'string'},
    closed_by: { type: 'string', required: false },
  },

};
