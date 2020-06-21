const mysql = require("mysql");
const inquirer = require("inquirer");
const conTab = require("console.table");

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
      message: "WELCOME TO COWBOY ADVERTISING AGENCY \n What would you like to do?",
      choices: [
         "View all Employees",
         "View all Employees By Department",
         "View all Employees By Manager",
         "Add Employee",
         "Remove Employee",
         "Update Employee Role",
         "Update Employee Manager",
         // -----------------------------------
         "View all Roles",
         "Add Role",
         "Remove Role",
         // -----------------------------------
         "View all Department",
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

            case "View all Employees by Department":
               viewEmpDep();
               break;
            
            case "View all employees by Manager":
               viewEmpMan();
               break;
            
            case "Add Employee":
               addEmp();
               break;
            
            case "Remove Employee":
               remEmp();
               break;
            
            case "Update Employee Role":
               updEmpRole();
               break;
            
            case "Update Employee Manager":
               updEmpMan();
               break;
            
            case "View all Roles":
               viewRoles();
               break;
            
            case "Add Role":
               addRole();
               break;
            
            case "Remove Role":
               remRole();
               break;
            
            case "Add Department":
               addDep();
               break;
            
            case "Remove Department":
               remDep();
               break;
            
            case "View the total utilized budget of a department":
               viewTotBudget();
               break;
            
            case "Exit":
               connection.end();
               break;
         };
      });
};

function viewEmp() {
   const query = "SELECT * FROM employees";
   connection.query(query, (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
         console.log(`${res[i].first_name}, ${res[i].last_name} - ${res[i].role_id} - Manager: ${res[i].manager_id}`);
      };
      run();
   });
}
