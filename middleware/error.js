const logger = require('winston');
const messages = require('../constants/messages');
module.exports = function (err, req, res, next) {
    // Log the exception
    logger.error(err.message);

    // incorrect json format found in request body
    if (err.message.includes("Unexpected token") || err.message.includes("JSON")) {
        return res.status(500).json({
            message: messages.INCORRECT_REQUEST_BODY_DATA,
            data: null
        });
    }

    return res.status(500).json({
        message: messages.INTERNAL_SERVER_ERROR,
        data: null
    });
}