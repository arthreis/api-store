const express = require('express');

const app = express();  //para iniciar  a aplicacao
const router = express.Router(); //dada uma url o usuario chega na app

const route = router.get('/', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    response.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route);

module.exports = app;