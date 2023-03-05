const server = require("./api/server");

const port = 9001;

server.listen(port, () => {
    console.log("listening on", port);
});