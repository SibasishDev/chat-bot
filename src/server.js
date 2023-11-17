"use strict;"
const express = require("express");

const app = express();

const cors = require('cors');

const morgan = require('morgan');

const path = require("path");

const config = require("./config/config");

const PORT = config.PORT || 8088;

const MongoDB = require("./config/mongodb.connection");

app.use(cors());

app.use(express.json({
    limit: "50mb",
    type: 'application/json'
}));

app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}));

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public/'));

// app.use(express.static(path.resolve(path.dirname(__dirname), "build","index.html")));

MongoDB.connect();

const server = app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

require("./services/socket.init")(server);


app.use("*",(req, res, next) => {
   return res.status(404).json({
    code : 404,
    message : "Not found"
   });
});

/**
 * error handler
 */
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: !err.status || err.status === 500 ? "Internal server error" : err.message
        }
    });
});