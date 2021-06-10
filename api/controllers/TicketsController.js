/**
 * TicketsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { inputs } = require("./user/register");

module.exports = {
  friendlyName: 'Ticket',
  description: 'Registrar ticket.',
  inputs: {
    soporte_clv: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: false,
      isEmail: false,
    },
    descripcion: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'boolean',
      required: true,
    },
  },

  index: async function(req, res){
    try {
      const tickets = await Ticket.find()
      res.send(tickets)
    }catch (err) {
      res.serverError(err.toString())
    }
  },

  create: async function(req, res){
    try{
      const ticket =  await Ticket.create(req.allParams())
      return res.send({
        'success': true,
        'message': 'Registro creado exitosamente',
        'data': ticket
      })
    }catch (err) {
      return res.serverError(err.toString())
    }
  },

  update: async function(req, res){
      try {
        const ticket = await Ticket.update(req.param('id'), req.allParams())
        return res.send({
          'success': true,
          'message': 'Registro actualizado',
          'data': ticket
        })
      }catch (err) {
        return res.serverError(err.toString())
      }
  },

  show: async function(req, res){
    try {
      const ticket = await Ticket.find(req.param('id'))
      res.send(ticket)
    }catch (err) {
      res.serverError(err.toString())
    }
  },

  delete: async function(req, res){
    try{
      await Ticket.destroy(req.param('id'))
      res.send('El registro ha sido eliminado')
    }catch{
      res.serverError(err.toString())
    }
  }


};

