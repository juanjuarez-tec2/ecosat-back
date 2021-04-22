'use strict'

var validator = require('validator');

var Producto = require('../models/productos');

var controller = {

    save: (req, res) => {

        var params = req.body;

        try{
            var validate_descripcion = !validator.isEmpty(params.descripcion);
            var validate_precio = !validator.isEmpty(params.precio);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_descripcion && validate_precio){

            var producto = new Producto();

            producto.descripcion = params.descripcion;
            producto.precio = params.precio;

            producto.save((err, productoStored) => {

                if(err || !productoStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El producto no se ha guardado !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    producto: productoStored
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

        var query = Producto.find({});

        query.sort('-_id').exec((err, productos) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los productos !!!'
                });
            }

            if(!productos){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay productos para mostrar !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                productos
            });

        });
    },

    getOne: (req, res) => {

        var productoId = req.params.id;

        if(!productoId || productoId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el producto !!!'
            });
        }

        Producto.findById(productoId, (err, producto) => {

            if(err || !producto){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el producto !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                producto
            });

        });
    },

    update: (req, res) => {

        var productoId = req.params.id;

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

            Producto.findOneAndUpdate({_id: productoId}, params, {new:true}, (err, productoUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!productoUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el producto !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    producto: productoUpdated
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

        var productoId = req.params.id;

        Producto.findOneAndDelete({_id: productoId}, (err, productoRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!productoRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el producto, posiblemente no exista !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                producto: productoRemoved
            });

        });
    },

};

module.exports = controller;