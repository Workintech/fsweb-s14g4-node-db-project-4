const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.json("App is working...")
})

module.exports = server;