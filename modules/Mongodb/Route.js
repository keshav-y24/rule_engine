var express = require("express");
const router = express.Router();

const controller = require("./Controller");

router.post("/insert", controller.addRecord);
router.get("/list/*", controller.getdata);
router.put("/update/*", controller.update);
router.get("/WinFrmSettings", controller.WinFrmSettings);

module.exports = router;