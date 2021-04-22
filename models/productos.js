'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    descripcion: String,
    precio: String,
    id_depto: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Productos', ProductosSchema);