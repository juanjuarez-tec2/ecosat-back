'use strict'

var validator = require('validator');

var Departamento = require('../models/departamentos');

var controller = {

    test: (req, res) => {
        return res.status(200).send({
            message: 'Api funcionando correctamente'
        });
    },

    save: (req, res) => {

        var params = req.body;

        try{
            var validate_descripcion = !validator.isEmpty(params.descripcion);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_descripcion){

            var depto = new Departamento();

            depto.descripcion = params.descripcion;

            depto.save((err, deptoStored) => {

                if(err || !deptoStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El departamento no se ha guardado !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    depto: deptoStored
                });

            });

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos !!!'
            });
        }

    },

    getAll: (req, res) => {

        var query = Departamento.find({});

        query.sort('-_id').exec((err, deptos) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los departamentos !!!'
                });
            }

            if(!deptos){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay departamentos para mostrar !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                deptos
            });

        });
    },

    getOne: (req, res) => {

        var deptoId = req.params.id;

        if(!deptoId || deptoId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el departamento !!!'
            });
        }

        Departamento.findById(deptoId, (err, depto) => {

            if(err || !depto){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el departamento !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                depto
            });

        });
    },

    update: (req, res) => {

        var deptoId = req.params.id;

        var params = req.body;

        try{
            var validate_descripcion = !validator.isEmpty(params.descripcion);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_descripcion){

            Departamento.findOneAndUpdate({_id: deptoId}, params, {new:true}, (err, deptoUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!deptoUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el departamento !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    depto: deptoUpdated
                });
            });
        }else{

            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }

    },

    delete: (req, res) => {

        var deptoId = req.params.id;

        Departamento.findOneAndDelete({_id: deptoId}, (err, deptoRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!deptoRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el departamento, posiblemente no exista !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                depto: deptoRemoved
            });

        });
    },

};

module.exports = controller;