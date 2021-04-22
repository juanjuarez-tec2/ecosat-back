'use strict'

var express = require('express');
var ProductosCtrl = require('../controllers/productos');

var router = express.Router();

router.post('/save', ProductosCtrl.save);
router.get('/getAll', ProductosCtrl.getAll);
router.get('/getOne/:id', ProductosCtrl.getOne);
router.put('/update/:id', ProductosCtrl.update);
router.delete('/delete/:id', ProductosCtrl.delete);

module.exports = router;