module.exports = async function (req, res, proceed) {
  const { email } = req.allParams();
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        error: `${email} no pertenece a un usuario`,
      });
    } else if (user.emailStatus === 'unconfirmed') {
      res.status(401).json({
        error: 'Esta cuenta no ha sido confirmada. Click en el link de su correo para mandar la confirmación.',
      });
    } else {
      return proceed();
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
