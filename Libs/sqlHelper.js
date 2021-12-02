const sql = require("mssql");
const conf = require("../env_config");

async function sqlquery(connectionstring, sqlquery, userInput) {
  let dbConfig = conf.RSQL_URL
  if (connectionstring == "L") {
    dbConfig = conf.SQL_URL;
  }
  
  const pool = new sql.ConnectionPool(dbConfig);
  pool.on('error', err => {
    // ... error handler 
    console.log('sql pool error db.js', err);
  });

  try {
    await pool.connect();
    let result = await pool.request();

    for (let key in userInput) {      
      result = await result.input(userInput[key].key, userInput[key].value);
    };
    result = await result.query(sqlquery);

    return result;
  } catch (err) {
    // stringify err to easily grab just the message
    let e = JSON.stringify(err, ["message", "arguments", "type", "name"]);
    return [{ error: JSON.parse(e).message }];
  } finally {
    pool.close(); //closing connection after request is finished.
  }





}


async function sqlProcedure(connectionstring, sqlquery, userInput) {
  let dbConfig = conf.RSQL_URL
  if (connectionstring == "L") {
    dbConfig = conf.SQL_URL;
  }
  const pool = new sql.ConnectionPool(dbConfig);
  pool.on('error', err => {
    // ... error handler 
    console.log('sql pool error db.js', err);
  });

  try {
    await pool.connect();
    let result = await pool.request();

    for (let key in userInput) {
      //console.log(userInput);
      // if ( Array.isArray(userInput[key]) ) {  
      //   // input(field_name, dataType, value)
      //   result = await result.input(key, "@"+userInput[key].key, userInput[key].value);
      // } else { 
      // input(field_name, value)
      //result.parameters()
      result = await result.input(userInput[key].key, userInput[key].value);
      //};
    };
    result = await result.execute(sqlquery);

    return result;
  } catch (err) {
    // stringify err to easily grab just the message
    let e = JSON.stringify(err, ["message", "arguments", "type", "name"]);
    return [{ error: JSON.parse(e).message }];
  } finally {
    pool.close(); //closing connection after request is finished.
  }




}

module.exports = {
  sqlquery: sqlquery,
  sqlProcedure: sqlProcedure
};
