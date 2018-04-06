'use strict';

const express = require('express');
const router = express.Router();

router.post('/', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    response.status(201).send(request.body);
});

router.put('/:id', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    let id = request.params.id;
    response.status(201).send({
        id: id,
        item: request.body
    });
});

router.delete('/', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    response.status(200).send(request.body);
});

module.exports = router;