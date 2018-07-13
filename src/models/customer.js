'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //_id = criado automaticamente 'guid()'
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    roles:[{
        type: String,
        required: true,
        enum:['user', 'admin'],
        default: 'user'
    }]
});

module.exports = mongoose.model('Customer', schema);//exportacao do schema (nome do schema, obj schema)