const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Survey = require('../models/survey');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  /*  #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
              firstName: "Pepe",
              lastName: "Argento",
              email: "review@gmail.com",
              password: ""
          }
  } */
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser) {
    res.status(409)
    return res.json({
      success: false,
      message: 'Este email ya existe en la plataforma. Si no recuerda la contraseña la puede recuperar',
    });
  }
  const user = await User({
    firstName,
    lastName,
    email,
    password
  });
  await user.save();
  res.json({ success: true, user });
};

exports.getUser = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email }).select('email');
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario ' + email + ' en la base de datos',
    });
  }
  else {
    const survey = await Survey.findOne({ email }).select('subjectSurvey');
    if (!survey) {
      return res.status(200).json({ success: true, user: user, interests: "El usuario " + email + " no tiene una encuesta asociada" });
    }
    return res.status(200).json({ success: true, user: user, interests: survey.subjectSurvey });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');

  if (users.length === 0)
    return res.status(404).json({
      success: false,
      message: 'No se encuentran usuarios en la base de datos',
    });

  res.json({ success: true, user: users });
};

exports.userSignIn = async (req, res) => {
  /*  #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
              email: "review@gmail.com",
              password: ""
          }
  } */
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario en la base de datos',
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({
      success: false,
      message: 'La contraseña es invalida',
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1800s',
  });

  const bearerToken = "Bearer " + token

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter(t => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  user.password = undefined;

  if (user) {
    const survey = await Survey.findOne({ email }).select('subjectSurvey');
    if (!survey) {
      return res.status(200).json({ success: true, bearerToken, user: user });
    }
    return res.status(200).json({ success: true, bearerToken, user: user, interests: survey.subjectSurvey });
  }
};

exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Autorización fallida!' });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    return res.status(200).json({ success: true, message: 'Cierre de sesión exitosa' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario en la base de datos.',
    });
  }
  else {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET_KEY, {
      expiresIn: '1800s',
    });

    const bearerToken = "Bearer " + token

    let oldTokens = user.tokens || [];

    if (oldTokens.length) {
      oldTokens = oldTokens.filter(t => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 86400) {
          return t;
        }
      });
    }
    return res.status(200).json({ success: true, message: "Se resetea contraseña de " + email });
  }
};

exports.passwordReset = async (req, res) => {
  /*  #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
              email: "review@gmail.com",
              password: "my-new-password"
          }
  } */
  const { email, password } = req.body;
  const _user = await User.findOne({ email });
  if (!_user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario en la base de datos.',
    });
  }
  const newPasswordHash = await bcrypt.hash(password, 8);
  const user = await User.findByIdAndUpdate(_user._id, { $set: { "password": newPasswordHash } });
  if (!user) {
    return res.status(409).json({
      success: false,
      message: 'No se pudo modificar la contraseña del usuario ' + user.email,
    });
  }
  else {
    return res.status(200).json({ success: true, message: "Contraseña modificada del usuario " + _user.email });
  }
};