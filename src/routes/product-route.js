'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/product-controller')

router.post('/', controller.post);//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
router.put('/:id', controller.put);
router.delete('/', controller.delete);
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);

module.exports = router;