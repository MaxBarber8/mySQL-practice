const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

connection.connect(function(err) {
  if(err) throw err;
  console.log('Connected!');

  let table1 = "CREATE TABLE IF NOT EXISTS account (account_number INT, balance INT)";
  let table2 = "CREATE TABLE IF NOT EXISTS account_changes (change_number INT, account_number INT, amount INT, changed_date DATE, remark VARCHAR(225))";
  
  connection.query(table1, (err, result) => {
      if (err) throw err;
      console.log('Table1 created!');
  });

  connection.query(table2, (err, result) => {
      if (err) throw err;
      console.log('Table2 created!');
  });

  connection.end();
});


