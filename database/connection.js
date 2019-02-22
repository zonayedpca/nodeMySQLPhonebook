const mysql = require('mysql'),
      { host, user, password, database } = require('../config'),
      { promisify } = require('util');

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
