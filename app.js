const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const http = require("http");
sql = require("mssql");
mysql = require('mysql');
const cors = require("cors");
const SQLdb = require("./modules/SQLdb/SQLdbRoute");
const Mongodb = require("./modules/Mongodb/Route");
const MySqldb = require("./modules/MySqldb/Route");
require("./getMongoConnection");
const conf = require("./env_config");
global.appRoot = path.resolve(__dirname);
var app = express();

app.set("port", conf.PORT);

app.use(cors());

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  })
);

app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

app.use("/api/v1/db/", SQLdb);
app.use("/html/", SQLdb);
app.use("/api/v1/mdb/", Mongodb);
app.use("/api/v1/mydb/", MySqldb);

app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client/build")));



app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});





app.use(function (err, req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,access_token, api_key, content-type,versions"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

global.app = app;

var startServer = http.createServer(app).listen(app.get("port"), function () {
  console.log("Server connected on port :", app.get("port"));
  startInitialProcess();
});

async function startInitialProcess() {
  let client;
  try {
    matrixclient = await MongoClient.connect(conf.MONGO_URL.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log(conf.MONGO_URL.connectionString);
    matrixdb = matrixclient.db(conf.MONGO_URL.collection);
    //await sql.connect(conf.SQL_URL);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

process.on("message", function (message) {
  console.log("Received signal : " + message);
  if (message === "shutdown") {
    startServer.close();
    setTimeout(function () {
      process.exit(0);
    }, 15000);
  }
});
