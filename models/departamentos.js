'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartamentosSchema = Schema({
    descripcion: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Departamentos', DepartamentosSchema);