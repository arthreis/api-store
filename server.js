'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();  //para iniciar  a aplicacao
const port = 3000;
app.set('port', port); //seta a porta que deve ser utilizado no app

const server = http.createServer(app); //criar o servidor
const router = express.Router(); //dada uma url o usuario chega na app

const route = router.get('/', (request, response, next) => {//quando o usuario acessar a url '/' ele caira na rota que criamos aqui
    response.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});
app.use('/', route);

server.listen(port); //pede pro servidor ficar ouvindo essa porta
console.log("API rodando na porta "+ port);
