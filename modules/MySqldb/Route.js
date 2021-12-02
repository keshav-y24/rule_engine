var express = require("express");
const router = express.Router();

const controller = require("./Controller");

router.get("/list/*", controller.getdata);

module.exports = router;