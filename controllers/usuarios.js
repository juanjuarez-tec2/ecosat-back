'use strict'

var Usuario = require('../models/usuarios');

var controller = {

    login: (req, res) => {

        var user = req.body;
        var types = ['Administrador', 'Supervisor', 'Cliente'];

        var random = Math.floor(Math.random() * types.length);
        user.tipo = types[random];
        user.nombre = user.tipo;

        if(!user.usuario || !user.contraseña) {
            return res.status(404).send({
                status: 'error',
                message: 'El usuario o la contraseña son incorrectos'
            });
        }

        return res.status(200).send({
            status: 'success',
            user
        });

    }

};

module.exports = controller;