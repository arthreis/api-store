const express = require('express');
const bodyParser = require('body-parser');

const app = express();  //para iniciar  a aplicacao
const router = express.Router(); //dada uma url o usuario chega na app

app.use(bodyParser.json());//todo o conteudo sera convertido para o JSON
app.use(bodyParser.urlencoded({ extended: false }));//codificar as urls

const route = router.get('/', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    response.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

const create = router.post('/', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    response.status(201).send(request.body);
});

const put = router.put('/:id', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    let id = request.params.id;
    response.status(201).send({
        id: id,
        item: request.body
    });
});

const del = router.delete('/', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    response.status(200).send(request.body);
});

app.use('/', route);
app.use('/products', create);
app.use('/products', put);
app.use('/products', del);

module.exports = app;