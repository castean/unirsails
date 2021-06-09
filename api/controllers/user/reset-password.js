module.exports = {
  friendlyName: 'Reset password',
  description: '',

  inputs: {
    password: {
      description: 'Nueva contraseña.',
      example: 'miContraseña',
      required: true,
    },
    token: {
      description:'El token del password que estaba en la contraseña olvidada',
      example: 'gwa8gs8hgw9h2g9hg29',
      required: true,
    },
  },

  exits: {
    success: {
      description:'Contraseña actualizada correctamente, el usauario sera redireccionado automaticamente',
    },
    invalidToken: {
      statusCode: 401,
      description:'El token para el reinicio de la contraseña es invalido, expiró, o ya ha sido utilizado.',
    },
  },

  fn: async function (inputs, exits) {

    if (!inputs.token) {
      return exits.invalidToken({
        error: 'Su token de reinicio es invalido o ha expirado',
      });
    }

    var user = await User.findOne({ passwordResetToken: inputs.token });

    if (!user || user.passwordResetTokenExpiresAt <= Date.now()) {
      return exits.invalidToken({
        error: 'Su token de reinicio es invalido o ha expirado',
      });
    }

    const hashedPassword = await sails.helpers.passwords.hashPassword(inputs.password);

    await User.updateOne({ id: user.id }).set({
      password: hashedPassword,
      passwordResetToken: '',
      passwordResetTokenExpiresAt: 0,
    });

    const token = await sails.helpers.generateNewJwtToken(user.email);

    this.req.user = user;
    return exits.success({
      message: `Contraseña reiniciada excitosamente. ${user.email} ha ingresado exitosamente`,
      data: user,
      token,
    });
  },
};
