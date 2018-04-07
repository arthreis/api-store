'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {   //listar todos os produtos
    Product
    .find({active: true}, 'title price slug')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e)
    });
}

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({
                 message: 'Produto cadastrado com sucesso!' 
            });
        }).catch(e => {
            res.status(400).send({
                 message: 'Falha ao cadastrar produto', 
                 data: e 
            })
        });
};

exports.put = (request, response, next) => {
    let id = request.params.id;
    response.status(201).send({
        id: id,
        item: request.body
    });
};

exports.delete = (request, response, next) => {
    response.status(200).send(request.body);
};