var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Spartan117",
  database: "CASCADE_DB"
});

function displayAll() {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log('Welcome to Cascade! Where our prices are always falling!')
    
    var query = connection.query("SELECT * FROM products", function(err, res) {
      console.table(res);
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].ID + " | " + res[i].Product_Name + " | " + res[i].Dept_Name + " | " + res[i].Price + " | " + res[i].Stock_Qty + " | " + res[i].Sold);
      }
    });
  });
    // logs the actual query being run
   
  };

  displayAll();