const express = require("express");

const tarifRouter = require("./recipe/recipe-router");

const server = express();

server.use(express.json());
server.use("/api/tarifler", tarifRouter);

module.exports = server;
