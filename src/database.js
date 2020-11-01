const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'database-1.cdvcjeyjbggm.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'rootroot',
  database: 'database-1',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
