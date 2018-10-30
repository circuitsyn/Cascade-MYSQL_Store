var mysql = require("mysql");
var inquirer = require("inquirer");
var amount = 0;
var stock = 0;
var item = 0;
const cTable = require('console.table');
// var Table = require('cli-table');

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

//function call to initiate connection
function connect(){
    connection.connect(function(err) {
      // console.log("connected as id " + connection.threadId);
      if (err) throw err;
    });
    };

//function to view products available
function viewProducts(){
    var query = connection.query("SELECT ID, Product_Name , Price, Stock_QTY FROM products;", function(err, res) {
        console.log("");
        console.table(res);
        console.log("");
        
        managerAsk();
    });
    };

//function call to view low inventory
function viewLowInventory(){
    var query = connection.query("SELECT ID, Product_Name , Price, Stock_QTY FROM products WHERE Stock_Qty < 20;", function(err, res) {
        console.log("");
        console.table(res);
        console.log(res);
        console.log("");
        
        managerAsk();
    });
    };

//function to store data in a variable for later use
function getQty(ID) {
    var query = connection.query("SELECT Stock_QTY FROM products WHERE ID = ?;",[ID] ,function(err, res) {
        if (err) throw err;
        console.log("inside getQTY");
        console.table(res);
        managerAsk();
        console.log("");
        stock = res.Stock_QTY;
        
    });
}

function updatedItem(id) {
    console.log('id value in updatedItem', id);
    var query = connection.query("SELECT ID, Product_Name , Price, Stock_QTY FROM products WHERE ID = ?;",[id],function(err, res) {
        if (err) throw err;
        console.log('Your item has been updated. Please see below:');
        console.table(res);
               
    });
};

//function to add to inventory
function addToInventory(){
    // viewProducts();

    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "input",
                message: "What item (ID) would you like to update?",
                name: "id", 
                validate: function validateID(name){
          
                    if(isNaN(name)===true){
                      console.log('\nBe sure to specify the correct ID as a number!')
                      return false;
                    }
                    else if(name === ""){
                      console.log('\nBe sure to specify the correct ID as a number!')
                      return false;
                    }
                    else {
                      return true;
                    }
                }
            },
            {
                type: "input",
                message: "How many would you like to order and add to the stock (whole number)?",
                name: "qty", 
                validate: function validateID(name){
          
                    if(isNaN(name)===true){
                      console.log('\nBe sure to specify the correct ID as a number!')
                      return false;
                    }
                    else if(name === ""){
                      console.log('\nBe sure to specify the correct ID as a number!')
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
            getQty(response.id);  
            console.log('stock in add function: ', stock);
            connection.query("UPDATE products SET ? WHERE ?; SELECT ID, Product_Name , Price, Stock_QTY FROM products WHERE ID = ?;",
            [
              {
                Stock_QTY: (stock + response.qty),
              },
              {
                ID: response.id,
              },
              {
                ID: response.id,
              },
              
            ],
                  function(err) {
                    if (err) throw err;
                    // console.log(res1);
                    // console.table(res2);
                    updatedItem(response.id);
                    
                  }
                );
                
                //restart again creating a loop by calling the starting function
               
    });
};


//function call to ask the manager what they would like to do
function managerAsk(){

    inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
        type: "rawlist",
        message: "Greetings, what action would you like to perform today? (select by picking a #)",
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
        name: "action", 
        },

        ])
    .then(function(response) {
        console.log(response);
        

        switch (response.action) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewLowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            default:
                console.log('Whoops! Looks like something went wrong. Are you sure you picked a number 1-4?');
        }
    });
};













connect();
// ---------------------- Greeting -------------------------
    
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
    console.log('\t ..and where we love our Managers and Staff like Family!');
    console.log("");

    managerAsk();