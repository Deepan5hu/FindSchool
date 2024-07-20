var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host     : process.env.Host,
  user     : process.env.User,
  password : process.env.Password,
  database : process.env.Database
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    console.error('Host:', process.env.Host);
    console.error('User:', process.env.User);
    console.error('Database:', process.env.Database);
    return;
  }
 
  console.log('database connection established');
});

module.exports = { connection };
