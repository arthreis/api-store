const express = require('express');
const bodyParser = require('body-parser');

const app = express();  //para iniciar  a aplicacao
const router = express.Router(); //dada uma url o usuario chega na app

//carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());//todo o conteudo sera convertido para o JSON
app.use(bodyParser.urlencoded({ extended: false }));//codificar as urls

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;