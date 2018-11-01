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
  password: "nada",
  database: "CASCADE_DB"
});

function updateSalesTotal(item, total) {
  connection.query("UPDATE products SET Product_Sales = Product_Sales + ? WHERE ID = ?;",[total,item],
        function(err) {
          if (err) throw err;

        });
};

function updateProduct(item, sold, amount, stock, product, price){
  index = item-1;
  newStock = stock - amount;
  total = price * amount;
  
  connection.query("UPDATE products SET ? WHERE ?; UPDATE products SET ? WHERE ?;",
  [
    {
      Sold: sold
    },
    {
      ID: item
    },
    {
      Stock_Qty: newStock
    },
    {
      ID: item
    }
  ],
        function(err) {
          if (err) throw err;
          console.log("Thank you for your purchase of " + product + "!");
          console.log("Your total is: " + total);
          console.log('');
          updateSalesTotal(item,total);
          
        }
      );
      
      //restart again creating a loop by calling the starting function
      displayAll();
};

function checkValue(item, amount) {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    index = item-1;
    console.table(results);
    sold = (parseInt(results[index].Sold) + parseInt(amount));
    stock = parseInt(results[index].Stock_Qty)
    product = results[index].Product_Name;
    price = results[index].Price;
    
    if ((results[index].Stock_Qty - amount) > 0){
      
      updateProduct(item, sold, amount, stock, product, price);
    }
    else{
      console.log('Our apologies we do not have enough in stock. We will work on restocking that time soon! Please do check out our other items for making another fantastic purchase at Cascade.');
    }
});

};

function connect(){
connection.connect(function(err) {
  // console.log("connected as id " + connection.threadId);
  if (err) throw err;
});
};

function displayAll() {
        
    var query = connection.query("SELECT ID, Product_Name, Dept_Name, Price, Stock_Qty FROM products;", function(err, res) {
      console.table(res);
      console.log("");
      customerAsk();
    });
    
  };

  //Inquiry to ask customer what they want to do
  function customerAsk(){
    
    inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "What is the item ID of the product you'd like to purchase?",
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
        message: "How many of them would you like to purchase?",
        name: "quantity",
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
      // console.log(response);
      item = response.id;
      // console.log('item: ', item);
      amount = response.quantity; 
      // console.log('amount: ', amount);
      checkValue(item, amount);
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
    console.log("");
  
    //Kick off to star display of data
    displayAll();