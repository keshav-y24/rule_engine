const tblList = require("../constants");
const methods = require("./SQLdbMethods");
let fs = require('fs');
const path = require("path");
const moment = require("moment");
const sqlHelper = require("../../Libs/sqlHelper");
const Utility = require("../../Libs/Utility");



async function insert(req, res) {
    try {


        let endpoint = req.body.data.root;
        let inputdata = req.body.data.body;
        if (!tblList[endpoint]) {
            res.send({
                status: 500,
                error: "endpoint not exist."
            });
        }

        var query = 'INSERT INTO ' + tblList[endpoint] + '(';
        var columns = [];
        var VALUES = [];
        for (var key in inputdata) {
            columns.push(key);
            VALUES.push(inputdata[key]);
        }
        query = query + columns.join() + ") VALUES ( '";
        query = query + VALUES.join("','") + "')";


        let result = await sqlHelper.sqlquery("L", query);
        console.log(query);

        res.send({
            status: 200,
            data: result,
            message: "Success"
        });
    } catch (err) {
        console.log(err);
        res.send({
            status: 500,
            error: err
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

        var query = 'UPDATE ' + tblList[endpoint] + ' SET ';
        var updatedata = [];
        var updatequery = [];
        let sqlparams = [];

        for (var key in inputdata) {
            updatedata.push(`${key} = @${key}`);
            sqlparams.push({ key: key, value: inputdata[key] });
        }
        query = query + updatedata.join();
        query = query + ` WHERE `;

        for (var key in querydata) {
            updatequery.push(`${key} = @${key}`);
            sqlparams.push({ key: key, value: querydata[key] });
        }
        query = query + updatequery.join();
        let result = await sqlHelper.sqlquery("L", query, sqlparams);

        res.send({
            status: 200,
            data: result,
            message: "Success"
        });

    } catch (err) {
        console.log(err);
        res.send({
            status: 500,
            error: err
        });
    }
    finally {
        await sql.close();
    }
}

async function getdata(req, res) {
    try {

        var endpoint = req.query.root;
        var c = req.query.c ? req.query.c : "R";
        if (methods.FindRoot(req, res)) {
            return;
        }

        if (!tblList[endpoint]) {
            res.send({
                status: 500,
                error: "endpoint not exist."
            });
        }

        // let skip = req.query.skip ? parseInt(req.query.skip) : 0,
        //     limit = req.query.limit ? parseInt(req.query.limit) : 10;

        let tablename = tblList[endpoint];
        if (tablename.toUpperCase().indexOf("NOLOCK") == -1) {
            tablename = tablename + " (NOLOCK) "
        }

        var query = 'SELECT  * FROM ' + tablename;// + ' (NOLOCK) ';


        if (req.query.cols && req.query.cols.length > 0) {
            query = 'SELECT  ' + req.query.cols.join() + ' FROM ' + tablename;// + ' (NOLOCK) ';
        }
        var whereCondition = [];
        let sqlparams = [];
        if (req.query.con) {
            query = query + ` WHERE `;
            for (var key in req.query.con) {
                let json = JSON.parse(req.query.con[key]);
                for (var obj in json) {
                    // whereCondition.push(`${obj} = '${json[obj]}'`);
                    var objparam = obj;
                    if (obj.indexOf('.') !== -1) {
                        var objparam = obj.replace('.', '')
                    }
                    console.log(objparam);
                    if (obj.toLowerCase().indexOf('date') > -1 || obj.toLowerCase().indexOf('time') > -1) {
                        whereCondition.push(`CAST(${obj} AS DATE) = @${objparam}`);
                    }
                    else {
                        whereCondition.push(`${obj} = @${objparam}`);
                    }

                    sqlparams.push({ key: objparam, value: json[obj] });
                }
            }
            query = query + whereCondition.join(' and ');
        }
        query = query + " ORDER BY 2 DESC";
        // query =
        //     query +
        //     ` ORDER BY 1
        //     OFFSET ${skip} ROWS
        //     FETCH NEXT ${limit} ROWS ONLY`;

        console.log(query);
        console.log(sqlparams);

        // let result = await sql.query(query);
        // await sql.close();
        let result = await sqlHelper.sqlquery(c, query, sqlparams);
        //console.log(result.recordsets);
        res.send({
            status: 200,
            data: result.recordsets,
            message: "Success"
        });
    } catch (err) {
        console.log(err);
        res.send({
            status: 500,
            error: "Please enter correct inputs."
        });
    }
    finally {
        //await sql.close();
    }
}


async function getdatasp(req, res) {
    try {
        var endpoint = req.query.root;
        var c = req.query.c ? req.query.c : "R";
        let params = req.query.params;
        if (!tblList[endpoint]) {
            res.send({
                status: 500,
                error: "endpoint not exist."
            });
        }
        var query = tblList[endpoint];
        let sqlparam = [];
        //const request = new sql.Request();
        let sqlparams = [];
        if (params) {
            for (var key in params) {
                const obj = JSON.parse(params[key])
                for (var k in obj) {
                    //request.input(k, obj[k]);
                    sqlparam.push({
                        key: k,
                        value: obj[k]
                    });
                    sqlparams.push("@" + k);
                }
            }
        }
        let result = await sqlHelper.sqlProcedure(c, query, sqlparam);

        res.send({
            status: 200,
            data: result.recordsets,
            message: "Success"
        });



    } catch (err) {
        console.log(err);
        res.send({
            status: 500,
            error: "Please enter correct inputs."
        });
    }
    finally {
        //await sql.close();
    }
}

async function deleteRow(req, res) {
    try {
        var patharray = req.url.split("/");
        var endpoint = patharray[patharray.length - 1];
        if (!tblList[endpoint]) {
            res.send({
                status: 500,
                error: "endpoint not exist."
            });
        }

        var query = 'DELETE FROM ' + tblList[endpoint];

        var updatequery = [];
        if (req.body.query) {
            query = query + ` WHERE `;
            for (var key in req.body.query) {
                updatequery.push(`${key} = '${req.body.query[key]}'`)
            }
            query = query + updatequery.join();
        }

        //let result = await sql.query(query);
        let result = await sqlHelper.sqlProcedure("L", query);

        res.send({
            status: 200,
            data: result,
            message: "Success"
        });
    } catch (err) {
        console.log(err);
        res.send({
            status: 500,
            error: "Please enter correct inputs."
        });
    }
    finally {
        await sql.close();
    }
}


async function login(req, res) {
    try {
        res.cookie("userid", "Admin");
        res.redirect(req.headers.origin + "/admin/UsersWFH");

    } catch (err) {
        res.send({
            status: 500,
            error: err
        });
    }
    finally {
        //await sql.close();
    }
}

module.exports = {
    insert: insert,
    update: update,
    getdata: getdata,
    delete: deleteRow,
    getdatasp: getdatasp,  
    login: login
};