var mysql = require("mysql");
var inquirer = require("inquirer");
var amount = 0;
var item = 0;
const cTable = require('console.table');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  multipleStatements: true,

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Spartan117",
  database: "CASCADE_DB"
});