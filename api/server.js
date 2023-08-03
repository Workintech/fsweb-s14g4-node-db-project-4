const express = require("express");
const server = express();
const tarifRouter = require("./Tarifler/tarif-router");
server.use(express.json());

server.get("/", (req, res) => {
    res.json("App is working...")
});

server.use("/api/Tarifler", tarifRouter);

module.exports = server;