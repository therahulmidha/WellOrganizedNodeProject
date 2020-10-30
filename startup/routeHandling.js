const express = require('express');
const error = require('../middleware/error');
const cors = require('cors')
module.exports = async function (app) {
    // allow cross origin resource sharing
    // so that front end app on another server can access our backend 
    app.use(cors());

    app.use(express.json());

    // Route endpoints
    app.use('/api/user', require('../routes/api/userRoute'));

    // middleware for handling internal server error
    app.use(error);

    // Middleware for unknown endpoints
    app.use(function (req, res, next) {
        return res.status(404).send({
            message: 'Route ' + req.url + ' Not found.',
            data: null
        });
    });
}