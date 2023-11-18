"use strict;"
const express = require("express");

const app = express();

const http = require("http");

const cors = require('cors');

const morgan = require('morgan');

const path = require("path");

const config = require("./config/config");

const MongoDB = require("./config/mongodb.connection");
const SocketController = require("./controller/socket.controller");

const socketIo = require("socket.io");

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });

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


 SocketController(io);

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

const start = async () => {
    try {

      await  MongoDB.connect();

       server.listen(config.PORT, () => console.log(`Server listening on ${config.PORT}`));

    } catch (error) {
      console.error("Failed to connect to the database:", error);
      process.exit(1);
    }
  };
  start();