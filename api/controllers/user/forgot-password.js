module.exports = {
  friendlyName: 'Forgot password',
  description: '',

  inputs: {
    email: {
      description: 'El correo del usuario que quiere recuperar el password.',
      example: 'nombre@midominio.com',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Correo coincide con el usuario y será enviado un email',
    },
  },

  fn: async function (inputs, exits) {
    var user = await User.findOne({ email: inputs.email });
    if (!user) {
      return;
    }
    const token = await sails.helpers.strings.random('url-friendly');
    await User.update({ id: user.id }).set({
      passwordResetToken: token,
      passwordResetTokenExpiresAt:
      Date.now() + sails.config.custom.passwordResetTokenTTL,
    });

    const recoveryLink = `${sails.config.custom.baseUrl}/user/reset-password?token=${token}`;
    const email = {
      to: user.email,
      subject: 'Reset Password',
      template: 'forgot-password',
      context: {
        name: user.fullName,
        recoverLink: recoveryLink,
      },
    };
    try {
      await sails.helpers.sendMail(email);
    } catch (error) {
      sails.log(error);
    }

    return exits.success({
      message: `Se envio un correo para reiniciar el password a ${user.email}.`,
    });
  },


};
