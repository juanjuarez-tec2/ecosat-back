'use strict'

var express = require('express');
var UsuariosCtrl = require('../controllers/usuarios');

var router = express.Router();

router.post('/login', UsuariosCtrl.login);

module.exports = router;