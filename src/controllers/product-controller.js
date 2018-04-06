'use strict';

exports.post = (req, res, next) => {
    res.status(201).send(req.body);
};

exports.put = (request, response, next) => {
    let id = request.params.id;
    response.status(201).send({
        id: id,
        item: request.body
    });
};

exports.delete = (request, response, next) => {
    response.status(200).send(request.body);
};