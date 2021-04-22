'use strict'

var express = require('express');
var DepartamentosCtrl = require('../controllers/departamentos');

var router = express.Router();


router.get('/test', DepartamentosCtrl.test);
router.post('/save', DepartamentosCtrl.save);
router.get('/getAll', DepartamentosCtrl.getAll);
router.get('/getOne/:id', DepartamentosCtrl.getOne);
router.put('/update/:id', DepartamentosCtrl.update);
router.delete('/delete/:id', DepartamentosCtrl.delete);

module.exports = router;