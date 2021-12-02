var mssql = require("mssql"); 
const conf = require("./env_config");

var connection = mssql.connect(conf.SQL_URL, function (err) {
    if (err)
        throw err; 
});

module.exports = connection;