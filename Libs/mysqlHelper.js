


async function mysqlquery(connectionstring, sqlquery, callback) {

  var mysql = require('mysql')
  var pool = mysql.createPool(connectionstring);
  try {

    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        callback(true, err);
        return;
      }
      connection.query(sqlquery, function (err, results) {
        connection.release();
        if (!err) {
          callback(false, { rows: results });
          return;
        }
        // check null for results here
      });
      connection.on('error', function (err) {
        console.log(err);
        //callback(true, err);
        //return;
      });
    });
  } catch (err) {
    callback(true, err);
    // stringify err to easily grab just the message

  } finally {
    //pool.close(); //closing connection after request is finished.
  }





}




module.exports = {
  mysqlquery: mysqlquery
};
