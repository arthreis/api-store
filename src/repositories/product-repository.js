'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {   //listar todos os produtos
    const res = await Product.find({
        active: true
    }, 'title price slug');   //atributos que serao mostrados
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags');
    return res;
}

exports.getById = async(id) => {
    const res = await Product
    .findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    const res = await Product
    .find({
        tags: tag,
        active: true
    }, 'title description price slug tags');
    return res;
}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                slug: data.slug,
                price: data.price
            }
        })
}

exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id);
}