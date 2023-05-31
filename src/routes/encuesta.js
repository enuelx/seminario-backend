const express = require('express');
var cors = require('cors')

const router = express.Router();
// lógica de la api
const {
  createUser,
  
} = require('../controllers/user');
// para que se use con el token despues de loguearse
const { isAuth, isAuthResetPassword } = require('../middlewares/config/auth');
// validaciones de lógica del contenido de los campos que se envían
const {
  validateUserSignUp,
  userValidation,
} = require('../middlewares/validation/user');

router.post('/signUp', cors(), validateUserSignUp, userValidation, createUser);


module.exports = router;
