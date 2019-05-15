'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

/**
 * @api {post} /customers/ Create
 * @apiName CreateCustomer
 * @apiGroup Customers
 * @apiVersion 0.0.1
 * 
 * @apiParam {String} name Mandatory Name of the customer.
 * @apiParam {String} email Mandatory Email of the customer.
 * @apiParam {String} password Mandatory Password of the customer.
 * @apiParamExample {json} Request-Example:
 * {
 *   "name": "FirstName LastName",
 *   "email" : "name@email.com",
 *   "password": "123456"
 * }
 * 
 * @apiSuccess {String} message Success message
 * 
 * @apiSuccessExample {json} Response-Success
 * HTTP/1.1 201 Created
 * {
 *   "message": "Customer saved successfully!"
 * }
 * 
 * @apiError NameHasMinLen The name must be at least <code>3</code> characters.
 * @apiError isEmail Invalid email.
 * @apiError PasswordHasMinLen The password must be at least <code>3</code> characters.
 * @apiErrorExample {json} Error-Validation:
 * HTTP/1.1 400 Bad Request
 * [
 *    {
 *        "message": "O nome deve conter pelo menos 3 caracteres!"
 *    },
 *    {
 *        "message": "E-mail inválido"
 *    },
 *    {
 *        "message": "A senha deve conter pelo menos 3 caracteres!"
 *    }
 * ]
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Falha ao processar sua requisição"
 * }
 * 
 */
exports.post = async(req, res, next) => {
    
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres!')
    contract.isEmail(req.body.email, 'E-mail inválido')
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 3 caracteres!')

    //Se os dados forem inválidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });

        emailService.send(req.body.email, 'Bem vindo à NodeStore', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!' 
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

/**
 * @api {post} /customers/authenticate Authenticate
 * @apiName AuthenticateCustomer
 * @apiGroup Customers
 * @apiVersion 0.0.1
 * 
 * @apiParam {String} email Mandatory Email of the customer.
 * @apiParam {String} password Mandatory Password of the customer.
 * @apiParamExample {json} Request-Example:
 * {
 *   "email" : "name@email.com",
 *   "password": "123456"
 * }
 * 
 * @apiSuccess {String} token Token value.
 * @apiSuccess {Object[]} data Params.
 * @apiSuccess {String} data.email Email of the customer.
 * @apiSuccess {String} data.name Name of the customer.
 * 
 * @apiSuccessExample {json} Response-Success
 * HTTP/1.1 201 Created
 * {
 *    "token": "eyJhbGciOiJIUzI1NiIsI",
 *    "data": {
 *        "email" : "name@email.com",
 *        "name": "FirstName LastName",
 *    }
 * }
 * 
 * @apiErrorExample {json} Error-Authenticate:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "Usuário ou senha inválidos"
 * }
 * @apiErrorExample {json} Error-Internal:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Falha ao processar sua requisição"
 * }
 * 
 */
exports.authenticate = async(req, res, next) => {
    
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer){
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id, 
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data:{
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

/**
 * @api {post} /customers/refresh-token Refresh token
 * @apiName RefreshTokenCustomer
 * @apiGroup Customers
 * @apiVersion 0.0.1
 * 
 * @apiParam {String} token Customer token.
 * @apiHeader {String} x-access-token Token.
 * @apiParamExample {json} Request-Example:
 * {
 *    "token": "eyJhbGciOiJIUzI1NiIsI",
 * }
 * 
 * @apiSuccess {String} token New token
 * 
 * @apiSuccessExample {json} Response-Success
 * HTTP/1.1 201 Created
 * {
 *    "token": "eyJhbGciOiJIUzI1NiIsI",
 *    "data": {
 *        "email" : "name@email.com",
 *        "name": "FirstName LastName",
 *    }
 * }
 * @apiErrorExample {json} Error-Unauthorized:
 * HTTP/1.1 401 Unauthorized
 * {
 *    "message": "Token inválido"
 * }
 * @apiErrorExample {json} Error-Not-Found:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "Cliente não encontrado"
 * }
 * @apiErrorExample {json} Error-Internal:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Falha ao processar sua requisição"
 * }
 * 
 */
exports.refreshToken = async(req, res, next) => {
    try {
        //Recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodifica token
        const data = await authService.decodeToken(token);
        
        const customer = await repository.getById(data.id);

        if(!customer){
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id, 
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: tokenData,
            data:{
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};