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
    // console.log("connected as id " + connection.threadId);
    if (err) throw err;
        
    var query = connection.query("SELECT * FROM products", function(err, res) {
      console.table(res);
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].ID + " | " + res[i].Product_Name + " | " + res[i].Dept_Name + " | " + res[i].Price + " | " + res[i].Stock_Qty + " | " + res[i].Sold);
      }
      console.log("");
      customerAsk();
    });
  });
    
   
  };

  function customerAsk(){
    
    inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "What is the item ID of the product you'd like to purchase?",
        name: "id",
        validate: function validateID(name){
          console.log('id: ',name);
          if(isNaN(name)){
            console.log('Be sure to specify the correct ID as a number!')
            return false;
          }
          else {
            return true;
          }
      }
      },
     
    ])
    .then(function(response) {
      console.log(response);
  });
};


// Greeting
    
    console.log("");
    console.log("  .oooooo.                                                  .o8       ");
    console.log(" d8P'  'Y8b                                                 888         ");
    console.log("888           .oooo.    .oooo.o    .ooooo.   .oooo.    .oooo888   .ooooo. ");
    console.log("888          'P  )88b  d88(  ''8 d88' '''Y8 'P  )88b  d88' '888  d88' '88b ");
    console.log("888           .oP'888  '''Y88b.  888        .oP'888  888   888  888ooo888");
    console.log("'88b    ooo  d8(  888  o.  )88b 888   .o8  d8(  888  888   888  888    .o ");
    console.log(" 'Y8bood8P'  'Y888'8o  ''888P'  Y8bod8P'  'Y888''8o  Y8bod88P'   Y8bod8P'");
    console.log("");
    console.log('\t Welcome to Cascade! Where our prices are always falling!');
    console.log("");
  
    displayAll();