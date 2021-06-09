const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: 'Generando nuevo token jwt',
  description: '',

  inputs: {
    subject: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Todo listo.',
    },
  },

  fn: async function (inputs) {
    const payload = {
      sub: inputs.subject, // subject
      iss: 'Soporte Unir API' // issuer
    };
    const secret = sails.config.jwtSecret || process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
  },

};

