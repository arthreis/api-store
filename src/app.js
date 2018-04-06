const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();  //para iniciar  a aplicacao
const router = express.Router(); //dada uma url o usuario chega na app

//conecta no banco
//mongoose.connect('mongodb://areis:areisndstoree@ds030719.mlab.com:30719/areis-ndstore');

mongoose.connect("mongodb://ds030719.mlab.com:30719/areis-ndstore",
    { 
        user: 'areis', 
        pass: 'areis#ndstore' 
    }, 
    function (err, db) {
        db.close();
});

//carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());//todo o conteudo sera convertido para o JSON
app.use(bodyParser.urlencoded({ extended: false }));//codificar as urls

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;