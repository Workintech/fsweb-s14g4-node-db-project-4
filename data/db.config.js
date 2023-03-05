const knex = require("knex");
const configfile = require("../knexfile");


const environmemnt = "development";
module.exports = knex(configFile[environment]);