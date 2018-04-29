'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {   //listar todos os produtos
    Product
    .find({active: true}, 'title price slug')   //atributos que serao mostrados
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

exports.getById = (req, res, next) => {
    Product
    .findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e)
    });
}

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

exports.post = (req, res, next) => {
    
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres!')
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres!')
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres!')

    //Se os dados forem inválidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

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

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                slug: req.body.slug,
                price: req.body.price
            }
        }).then(x => {
            res.status(200).send({
                 message: 'Produto atualizado com sucesso!' 
            });
        }).catch(e => {
            res.status(400).send({
                 message: 'Falha ao atualizar produto', 
                 data: e 
            })
        });
};

exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({
                 message: 'Produto removido com sucesso!' 
            });
        }).catch(e => {
            res.status(400).send({
                 message: 'Falha ao remover produto', 
                 data: e 
            })
        });
};