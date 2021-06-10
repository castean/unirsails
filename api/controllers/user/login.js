module.exports = {
  friendlyName: 'Login',
  description: 'Login user.',

  inputs: {
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Acceso exitoso",
    },
    notAUser: {
      statusCode: 404,
      description: "Usuario no encontrado",
    },
    passwordMismatch: {
      statusCode: 401,
      description: "Contraseña no coincide o está incorrecto",
    },
    operationalError: {
      statusCode: 400,
      description: 'La solicitud no pudo ser realizada propiamente'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const user = await User.findOne({ email: inputs.email });
      if (!user) {
        return exits.notAUser({
          error: `La cuenta que pertenece a ${inputs.email} no fue encontrada`,
        });
      }
      await sails.helpers.passwords
        .checkPassword(inputs.password, user.password)
        .intercept('incorrect', (error) => {
          exits.passwordMismatch({ error: error.message });
        });

      const token = await sails.helpers.generateNewJwtToken(user.email);


      return exits.success({
        message: `El ${user.email} acceso exitosamente`,
        data: user,
        token,
      });

    } catch (error) {
      sails.log.error(error);
      if (error.isOperational) {
        return exits.operationalError({
          message: `Error al tratar de entrar como ${inputs.email}, error de token`,
          error: error.raw,
        });
      }
      return exits.error({
        message: `Error entrando como ${inputs.email}`,
        error: error.message,
      });
    }
  }


};
