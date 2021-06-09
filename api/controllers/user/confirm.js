module.exports = {
  friendlyName: 'Confirm',
  description: 'Confirm user.',
  inputs: {
    token: {
      type: 'string',
      description: "El token de confirmacion del email.",
      example: "4-32fad81jdaf$329",
    },
  },
  exits: {
    success: {
      description: "Email confirmado y requiere que el usuario entre.",
    },
    invalidOrExpiredToken: {
      statusCode: 400,
      description:
        "El token proporcionado a expirado, es invalido, o está en uso.",
    },
  },
  fn: async function (inputs, exits) {
    if (!inputs.token) {
      return exits.invalidOrExpiredToken({
        error: 'El token proporcionado ha expirado, es invalido, o está en uso.',
      });
    }
    var user = await User.findOne({ emailProofToken: inputs.token });

    if (!user || user.emailProofTokenExpiresAt <= Date.now()) {
      return exits.invalidOrExpiredToken({
        error: 'El token proporcionado ha expirado, es invalido, o está en uso.',
      });
    }


    if (user.emailStatus === 'unconfirmed') {
      await User.update({ id: user.id }).set({
        emailStatus: 'confirmed',
        emailProofToken: '',
        emailProofTokenExpiresAt: 0,
      });
      return exits.success({
        message: 'Tu cuenta ha sido confirmada',
      });

    }
  }


};
