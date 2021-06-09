module.exports = {
  friendlyName: 'Register',
  description: 'Register user.',
  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'Nuevo usuario creado',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Direccion Email ya esta en uso',
    },
    error: {
      description: 'Algo salio mal',
    },
  },

  fn: async function (inputs, exits) {
    // All done.
    try {
      const newEmailAddress = inputs.email.toLowerCase();
      const token = await sails.helpers.strings.random('url-friendly');
      let newUser = await User.create({
        fullName: inputs.fullName,
        email: newEmailAddress,
        password: inputs.password,
        emailProofToken: token,
        emailProofTokenExpiresAt:
          Date.now() + sails.config.custom.emailProofTokenTTL,
      }).fetch();
      const confirmLink = `${sails.config.custom.baseUrl}/user/confirm?token=${token}`;
      const email = {
        to: newUser.email,
        subject: 'Confirma tu cuenta',
        template: 'confirm',
        context: {
          name: newUser.fullName,
          confirmLink: confirmLink,
        },
      };

      await sails.helpers.sendMail(email);

      return exits.success({
        message: `La cuenta fue creada exitosamente para el usuario ${newUser.email}. Revise su correo para verificación`,
      });
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) ocurrio un error',
          error: 'Esta direccion de correo ya existe',
        });
      }
      return exits.error({
        message: 'Oops :) ocurrio un error',
        error: error.message,
      });
    }
  },


};
