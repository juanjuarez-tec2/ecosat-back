'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var departamentos_routes = require('./routes/departamentos');
var productos_routes = require('./routes/productos');
var usuarios_routes = require('./routes/usuarios');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/departamentos', departamentos_routes);
app.use('/api/productos', productos_routes);
app.use('/api/usuarios', usuarios_routes);

module.exports = app;