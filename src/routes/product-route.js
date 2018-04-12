'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/product-controller')

router.post('/', controller.post);//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
router.get('/', controller.get);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;