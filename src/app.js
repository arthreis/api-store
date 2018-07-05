const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();  //para iniciar  a aplicacao
const router = express.Router(); //dada uma url o usuario chega na app

//conecta no banco
//mongoose.connect('mongodb://areis:areisndstoree@ds030719.mlab.com:30719/areis-ndstore');
let database;
mongoose.connect(config.connectionString,
    { 
        user: 'areis', 
        pass: 'areis#ndstore' 
    }, 
    function (err, db) {
        if(err){
            return console.error(err);
        }else{
            console.log('Database connected!');
        }
        //db.close();
});

//carrega os Models
const Product  = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

//carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());//todo o conteudo sera convertido para o JSON
app.use(bodyParser.urlencoded({ extended: false }));//codificar as urls

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;