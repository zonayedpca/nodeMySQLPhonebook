const mysql = require('mysql'),
      { promisify } = require('util'),
      { host, user, password, database } = require('../config');

const connection = mysql.createConnection({
  host,
  user,
  password,
  database,
  port: 3306
});

connection.connect((err) => {
  if(err) console.log(err);
  else console.log('Connected!');
});


connection.query = promisify(connection.query);

module.exports = connection;
