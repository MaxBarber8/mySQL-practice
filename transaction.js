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

  connection.beginTransaction(function(err) {
    if (err) throw err;

    let transferAmount = 1000;
    let sourceAccount = 101;
    let destinationAccount = 102;
    let transferFromQuery = `UPDATE account SET balance = balance - ${transferAmount} WHERE account_number = ${sourceAccount}`;
    let transferToQuery = `UPDATE account SET balance = balance + ${transferAmount} WHERE account_number = ${destinationAccount}`;

    connection.query(transferFromQuery, function(err, result) {
      if (err) { 
        connection.rollback(function() {
          throw err;
        });
      }

      connection.query(transferToQuery, function(err, result) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }

        let logTransferQuery = `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (${sourceAccount}, -${transferAmount}, NOW(), 'Transfer to account ${destinationAccount}'), (${destinationAccount}, ${transferAmount}, NOW(), 'Transfer from account ${sourceAccount}')`;

        connection.query(logTransferQuery, function(err, result) {
          if (err) { 
            connection.rollback(function() {
              throw err;
            });
          }

          connection.commit(function(err) {
            if (err) { 
              connection.rollback(function() {
                throw err;
              });
            }
            console.log('Transaction Completed Successfully.');
            connection.end();
          });
        });
      });
    });
  });
});
