'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuariosSchema = Schema({
    nombre: String,
    usuario: String,
    tipo: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);