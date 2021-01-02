//Rutas para autenticar usuario
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../Controllers/authController');
const auth = require('../middleware/auth');
//inicia sesión
//api/auth
router.post('/',
    authController.autenticarUsuario
);  

//obtiene el usuario autenticado 
//api/auth
router.get('/',
    auth,
    authController.usuarioAutenticado 
);

module.exports = router;