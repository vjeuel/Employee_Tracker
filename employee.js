const mysql = require("mysql");
const inquirer = require("inquirer");
const CFonts = require('cfonts');
require("console.table");

CFonts.say('COWBOY|ad agency', {
   font: 'block',              // define the font face
   align: 'center',              // define text alignment
   colors: ['yellow', 'black'],         // define all colors
   background: 'redBright',  // define the background color, you can also use `backgroundColor` here as key
   letterSpacing: 2,           // define letter spacing
   lineHeight: 0,              // define the line height
   space: true,                // define if the output text should have empty lines on top and on the bottom
   maxLength: '0',             // define how many character can be on one line
   gradient: true,            // define your two gradient colors
   independentGradient: false, // define if you want to recalculate the gradient for each new line
   transitionGradient: false,  // define if this is a transition between colors directly
   env: 'node'                 // define the environment CFonts is being executed in
});

CFonts.say('EMPLOYEE TRACKER', {
   font: 'tiny',              // define the font face
   align: 'center',              // define text alignment
   colors: ['white'],         // define all colors
   background: 'black',  // define the background color, you can also use `backgroundColor` here as key
   letterSpacing: 2,           // define letter spacing
   lineHeight: 0,              // define the line height
   space: true,                // define if the output text should have empty lines on top and on the bottom
   maxLength: '0',             // define how many character can be on one line
   gradient: true,            // define your two gradient colors
   independentGradient: false, // define if you want to recalculate the gradient for each new line
   transitionGradient: false,  // define if this is a transition between colors directly
   env: 'node'                 // define the environment CFonts is being executed in
});

var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: "pizza123",
   database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  run();
});

function run() {
   inquirer.prompt({
      name: "general",
      type: "list",
      message: "What would you like to do?",
      choices: [
         "View all Employees",
         "View all Employees By Department",
         "View all Employees By Manager",
         "Add Employee",
         "Remove Employee",
         "Update Employee's Role",
         "Update Employee's Manager",
         // -----------------------------------
         "View Roles",
         "Add Role",
         "Remove Role",
         // -----------------------------------
         "View Department",
         "Add Department",
         "Remove Department",
         // -----------------------------------
         "View the total utilized budget of a department",
         // -----------------------------------
         "Exit"
      ]
   })
      .then(answer => {
         switch (answer.general) {
            case "View all Employees":
               viewEmp();
               break;

            case "View all Employees By Department":
               viewEmpDep();
               break;
            
            case "View all Employees By Manager": // BONUS
               viewEmpMan();
               break;
            
            case "Add Employee":
               addEmp();
               break;
               
            case "Remove Employee": // BONUS
               remEmp();
               break;
               
            case "Update Employee's Role":
               updEmpRole();
               break;
               
            case "Update Employee's Manager": // BONUS
               updEmpMan();
               break;
               
            case "View Roles":
            viewRole();
            break;
            
            case "Add Role":
               addRole();
               break;
               
            case "Remove Role": // BONUS
               remRole();
               break;
               
            case "View Department":
            viewDep();
            break;
            
            case "Add Department":
               addDep();
               break;
               
            case "Remove Department": // BONUS
               remDep();
               break;
               
            case "View the total utilized budget of a department": // BONUS
               viewTotBudget();
               break;
               
            case "Exit":
               connection.end();
               break;
               };
            });
};
