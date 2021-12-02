const tblList = require("../constants");
let fs = require('fs');
const path = require("path");

async function getdata(req, res) {
  try {
    var endpoint = req.query.root;
    var c = req.query.c ? req.query.c : "R";
    var query = JSON.parse(req.query.con);
    var cols = JSON.parse(req.query.cols);

    //console.log(endpoint,c);
    if (!tblList[endpoint]) {
      res.send({
        status: 500,
        error: "endpoint not exist."
      });
    }

    let data = await commondb.collection(tblList[endpoint])
      .find(query, { fields: cols })
      .toArray();
    //console.log("Record Getting");
    //console.log(data);
    res.send({
      status: 200,
      data: data,
      message: "Success"
    });
  } catch (err) {
    //console.log(err);
    res.send({
      status: 500,
      error: "Please enter correct inputs."
    });
  }
  finally {
    //await sql.close();
  }
}

async function update(req, res) {
  try {
    let endpoint = req.body.data.root;
    let inputdata = req.body.data.body;
    let querydata = req.body.data.querydata;
    if (!tblList[endpoint]) {
      res.send({
        status: 500,
        error: "endpoint not exist."
      });
    }
    var collection = commondb.collection(tblList[endpoint]);

    collection.updateOne(querydata, {
      $set: inputdata
    }, function (err, results) {
      //console.log(results.result);
      res.send({
        status: 200,
        data: results.result,
        message: "Success"
      });
    });


  } catch (err) {
    //console.log(err);
    res.send({
      status: 500,
      error: err
    });
  }
  finally {
    // await commondb.close();
  }
}

const addRecord = async function (req, res) {
  try {
    //console.log(req);

    let endpoint = req.body.data.root;
    let inputdata = req.body.data.body;
    if (!tblList[endpoint]) {
      res.send({
        status: 500,
        error: "endpoint not exist."
      });
    }
    await matrixdb.collection(tblList[endpoint]).insertOne(inputdata);
    //console.log("Record Inserted");
    res.send({
      status: 200,
      message: "Success"
    });

  } catch (e) {
    console.log(e);
    res.send({
      status: 500,
      error: "Please enter correct inputs."
    });
  }
};

const WinFrmSettings = async function (req, res) {
  try {

    // let settings = await matrixdb.collection("WinFrmSettings").findOne({});
    // res.send(settings);

    fs.readFile(path.join(appRoot, "public/json", "winfrm.json")

      , null, function (error, data) {
        if (error) {
          res.writeHead(404);
          res.write('Whoops! File not found!');
        } else {
          try {
            res.write(data);

          }
          catch (e) {
            res.write(e.toString());
          }
        }
        res.end();
      });

  } catch (e) {
    console.log(e);
    res.send({
      status: 500,
      error: "Please enter correct inputs."
    });
  }
};

module.exports = {
  addRecord: addRecord,
  update: update,
  WinFrmSettings: WinFrmSettings,
  getdata: getdata,
};
