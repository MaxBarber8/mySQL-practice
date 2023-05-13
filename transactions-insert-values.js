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
  
    let insertIntoAccount = "INSERT INTO account (account_number, balance) VALUES ?";
    let accountValues = [
      [1, 2000],
      [2, 3000],
      [3, 4000]
    ];
  
    connection.query(insertIntoAccount, [accountValues], (err, result) => {
      if (err) throw err;
      console.log('Records inserted into account table: ' + result.affectedRows);
    });
  
    let insertIntoAccountChanges = "INSERT INTO account_changes (change_number, account_number, amount, changed_date, remark) VALUES ?";
    let accountChangesValues = [
      [1, 1, 500, '2023-05-12', 'Deposit'],
      [2, 2, 300, '2023-05-13', 'Withdrawal'],
      [3, 3, 1000, '2023-05-14', 'Deposit']
    ];
  
    connection.query(insertIntoAccountChanges, [accountChangesValues], (err, result) => {
      if (err) throw err;
      console.log('Records inserted into account_changes table: ' + result.affectedRows);
    });
  
    connection.end();
  });