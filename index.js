const express = require('express');
const app = express();

(async () => {
    app.use(express.static(__dirname + '/public'));

    await require('./startup/logging')(app);
    await require('./startup/routeHandling')(app);
    await require('./startup/socketComm')(app);
    await require('./startup/httpServer')(app);
    await require('./startup/db')(app);
    

    if (app.get("env") === "production") {
        require('./startup/prod');
    }
})();