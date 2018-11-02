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
//function to view depaertments
function viewDepts(){
    var query = connection.query("SELECT Department_ID, Department_Name FROM departments;", function(err, res) {
        console.log("");
        console.table(res);
        console.log("");
        superAsk();
    });
    };

//function to add a department
function createDept() {
    console.log("\nFantastic, let's add a new product! To get started let's answer a few questions:\n")
    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "input",
                message: "What is the department name you would like to create?",
                name: "deptName", 
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
            var buildDept = response.deptName; 
                    
            var query = connection.query("INSERT INTO departments (Department_Name) VALUES (?);",[buildDept], async function(err, res) {
                if (err) throw err;
                console.log("\nCongrats on adding a new department! Here is your department with the rest!")
                viewDepts();
                
            });
    

    
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

        switch (response.action) {
            case 'View Product Sales by Department':
                viewProdSales();
                break;
            case 'Create New Department':
                createDept();
                break;
            default:
                console.log('Whoops! Looks like something went wrong. Are you sure you picked a number 1-2?');
        }
    });
};

function viewProdSales(){
    var query = connection.query("SELECT departments.Department_ID, departments.Department_Name, departments.Over_Head_Costs, SUM(products.Sold) AS Total_Sold, SUM(products.Product_Sales) - departments.Over_Head_Costs AS Total_Profit FROM products INNER JOIN departments ON products.Dept_Name = departments.Department_Name GROUP BY departments.Department_Name;", function(err, res) {
        if (err) throw err;
        console.table(res);
        superAsk();
    });
}


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