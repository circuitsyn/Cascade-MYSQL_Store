var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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

//function call to ask the manager what they would like to do
function superAsk(){

    inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
        type: "rawlist",
        message: "Greetings, what action would you like to perform today? (select by picking a #)",
        choices: ['View Product Sales by Department', 'Create New Department'],
        name: "action", 
        },

        ])
    .then(function(response) {
        console.log(response);
        

        switch (response.action) {
            case 'View Product Sales by Department':
                // viewProducts();
                console.log('view success!');
                break;
            case 'Create New Department':
                // viewLowInventory();
                console.log('create success!');
                break;
            default:
                console.log('Whoops! Looks like something went wrong. Are you sure you picked a number 1-2?');
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
    console.log('\t ..and where we love our Supervisors and Staff like Family!');
    console.log("");

    superAsk();