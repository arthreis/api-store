'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();  //para iniciar  a aplicacao
const port = normalizePort(process.env.PORT || '3000');
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
server.on('error', onError);
server.on('listening', onListener);

console.log("API rodando na porta "+ port);

function normalizePort(val){
    const port = parseInt(val,  10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0){
        return port;
    }

    return false;
}

function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe '+port : 'Port '+port;

    switch(error.code){
        case 'EACCESS':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListener(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe '+addr : 'port '+addr.port;
    debug('Listening on ' + bind);
}