//Declaration of variables and requirement of needed libraries
var mysql = require("mysql");
var inquirer = require("inquirer");
var amount = 0;
var stock = 0;
var item = 0;
const cTable = require('console.table');

//details to establish connection to MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  multipleStatements: true,

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "nada",
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
        console.log("");
        managerAsk();
    });
    };

//function to update stock
function updateProducts(stock, id, qty){
    connection.query("UPDATE products SET ? WHERE ?;",
            
    [
        {
        Stock_QTY: (parseInt(stock) + parseInt(qty)),
        },
        {
        ID: id,
        },                
    ],
            function(err) {
            if (err) throw err;
            updatedItem(id);
            
            }
        );    
        
};

//function to store data in a variable for later use
function getQty(ID, qty) {
    var query = connection.query("SELECT Stock_QTY FROM products WHERE ID = ?;",[ID] ,function(err, res) {
        if (err) throw err;
        stock = res[0].Stock_QTY;
        updateProducts(stock, ID, qty);
    });
    return stock;
}

//function used to show the new stock of the increased inventory item
function updatedItem(id) {
    console.log("");
    var query = connection.query("SELECT ID, Product_Name , Price, Stock_QTY FROM products WHERE ID = ?;",[id],function(err, res) {
        if (err) throw err;
        console.log('Your item has been updated. Please see below:');
        console.table(res);
        console.log("");
        managerAsk();
               
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
                // validate: function validateID(name){
          
                //     if(isNaN(name)===true){
                //       console.log('\nBe sure to specify the correct ID as a number!')
                //       return false;
                //     }
                //     else if(name === ""){
                //       console.log('\nBe sure to specify the correct ID as a number!')
                //       return false;
                //     }
                //     else {
                //       return true;
                //     }
                // }
            },
            {
                type: "input",
                message: "How many would you like to order and add to the stock (whole number)?",
                name: "qty", 
                // validate: function validateID(name){
          
                //     if(isNaN(name)===true){
                //       console.log('\nBe sure to specify the correct ID as a number!')
                //       return false;
                //     }
                //     else if(name === ""){
                //       console.log('\nBe sure to specify the correct ID as a number!')
                //       return false;
                //     }
                //     else {
                //       return true;
                //     }
                // }
            },

            ])
        .then(function(response) {
            getQty(response.id, response.qty);  
        });
};

//function to create a new product by taking in data and then inserting it into the MySQL database
function addNewProduct() {
    console.log("\nFantastic, let's add a new product! To get started let's answer a few questions:\n")
    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "input",
                message: "What is the product name?",
                name: "prodName", 
                // validate: function validateID(name){
          
                //     if(isNaN(name)===true){
                //       console.log('\nBe sure to specify the correct ID as a number!')
                //       return false;
                //     }
                //     else if(name === ""){
                //       console.log('\nBe sure to specify the correct ID as a number!')
                //       return false;
                //     }
                //     else {
                //       return true;
                //     }
                // }
            },
            {
                type: "input",
                message: "What is the department Name it falls under?",
                name: "deptName", 
                // validate: function validateID(name){
          
                //     if(isNaN(name)===true){
                //       console.log('\nBe sure to specify the correct ID as a number!')
                //       return true;
                //     }
                //     else if(name === ""){
                //       console.log('\nBe sure to specify a text based department name!')
                //       return false;
                //     }
                //     else {
                //       return true;
                //     }
                // }
            },
            {
                type: "input",
                message: "What is the price of the item?",
                name: "price", 
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
                message: "How many are in stock?",
                name: "stockQTY", 
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
            var buildProd = response.prodName; 
            var buildDept = response.deptName;
            var buildPrice = response.price; 
            var buildStock = response.stockQTY;          
        
        var query = connection.query("INSERT INTO products (Product_Name, Dept_Name, Price, Stock_Qty) VALUES (?, ?, ?, ?);",[buildProd, buildDept, buildPrice, buildStock],function(err, res) {
            if (err) throw err;
            console.log("\nCongrats on adding a new product! Here is your product with the rest!")
            viewProducts();
    

    });
});

};

//function call to ask the manager what they would like to do
function managerAsk(){

    inquirer
    .prompt([

        {
        type: "rawlist",
        message: "Greetings, what action would you like to perform today? (select by picking a #)",
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
        name: "action", 
        },

        ])
    .then(function(response) {

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
            case 'Exit':
                process.exit();
                break;
            default:
                console.log('Whoops! Looks like something went wrong. Are you sure you picked a number 1-4?');
        }
    });
};

//function call to kick off the connection
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

    //function call to kick off the program and questions to the manager
    managerAsk();