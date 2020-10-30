const config = require('config');
const logger = require('winston');
module.exports = async function(app){
    const ip = config.get("server.ip");
    const port = process.env.PORT || config.get("server.port");
    app.listen(port, ip, () => {
        logger.info(`Server started on http://${ip}:${port}`);
        console.log(`Server started on http://${ip}:${port}`);
    });
}