var express = require("express");
const router = express.Router();
const controller = require("./SQLdbController");

router.post("/insert/*", controller.insert);
router.post("/update/*", controller.update);
router.get("/list/*", controller.getdata);
router.delete("/delete/*", controller.delete);
router.get("/listsp/*", controller.getdatasp);
router.post("/login", controller.login);
module.exports = router;
