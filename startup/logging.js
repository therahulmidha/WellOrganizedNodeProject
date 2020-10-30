const winston = require('winston');
const { createLogger, transports, format } = require('winston');
const morgan = require('morgan')
module.exports = async function (app) {
    const date = new Date();
    const fileName = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-";
    const logger = createLogger({
        transports: [
            new transports.File({
                filename: `./logs/${fileName}-ERROR.log`,
                level: 'error',
                format: format.combine(format.timestamp(), format.json())
            }),
            new transports.File({
                filename: `./logs/${fileName}-INFO.log`,
                level: 'info',
                format: format.combine(format.timestamp(), format.json())
            }),

            new transports.Console({
                level: 'error',
                format: format.combine(format.timestamp(), format.json())
            }),
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), format.json())
            }),
        ]
    });

    winston.add(logger);

    // Exception logging
    process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex);
    });

    process.on('unhandledRejection', (ex) => {
        logger.error(ex.message, ex);
    });

    // Requests logging in dev envt.
    if (app.get("env") === "development") {
        app.use(morgan('dev'));
    }
}