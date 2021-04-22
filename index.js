'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3100;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ecosat-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a la base de datos correcta !!!');

        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:'+port);
        });

    });