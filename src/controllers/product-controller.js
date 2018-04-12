'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getById = (req, res, next) => {
    Product
    .findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e)
    });
}

exports.getBySlug = (req, res, next) => {
    Product
    .findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e)
    });
}

exports.get = (req, res, next) => {   //listar todos os produtos
    Product
    .find({active: true}, 'title price slug')   //atributos que serao mostrados
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

exports.getByTag = (req, res, next) => {
    Product
    .find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
};