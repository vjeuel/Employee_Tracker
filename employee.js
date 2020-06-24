const mysql = require("mysql");
const inquirer = require("inquirer");
const CFonts = require('cfonts');
require("console.table");

CFonts.say('COWBOY|ad agency', {
   font: 'block',                // define the font face
   align: 'center',              // define text alignment
   colors: ['yellow', 'black'],  // define all colors
   background: 'redBright',      // define the background color, you can also use `backgroundColor` here as key
   letterSpacing: 2,             // define letter spacing
   lineHeight: 0,                // define the line height
   space: true,                  // define if the output text should have empty lines on top and on the bottom
   maxLength: '0',               // define how many character can be on one line
   gradient: true,               // define your two gradient colors
   independentGradient: false,   // define if you want to recalculate the gradient for each new line
   transitionGradient: false,    // define if this is a transition between colors directly
   env: 'node'                   // define the environment CFonts is being executed in
});

CFonts.say('EMPLOYEE TRACKER', {
   font: 'tiny',                 // define the font face
   align: 'center',              // define text alignment
   colors: ['white'],            // define all colors
   background: 'black',          // define the background color, you can also use `backgroundColor` here as key
   letterSpacing: 2,             // define letter spacing
   lineHeight: 0,                // define the line height
   space: true,                  // define if the output text should have empty lines on top and on the bottom
   maxLength: '0',               // define how many character can be on one line
   gradient: true,               // define your two gradient colors
   independentGradient: false,   // define if you want to recalculate the gradient for each new line
   transitionGradient: false,    // define if this is a transition between colors directly
   env: 'node'                   // define the environment CFonts is being executed in
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
         // "View all Employees By Manager",
         "Add Employee",
         // "Remove Employee",
         "Update Employee's Role",
         // "Update Employee's Manager",
         // -----------------------------------
         "View Roles",
         "Add Role",
         // "Remove Role",
         // -----------------------------------
         "View Departments",
         "Add Department",
         // "Remove Department",
         // -----------------------------------
         // "View the total utilized budget of a department",
         // -----------------------------------
         "Exit"
      ]
   })
      .then(answer => {
         switch (answer.general) {
            case "View all Employees": // DONE
               viewEmployees();
               break;

            case "View all Employees By Department": // DONE
               viewEmployeesDep();
               break;
            
            // case "View all Employees By Manager": // BONUS
            //    viewEmpMan();
            //    break;
            
            case "Add Employee":
               addEmployee();
               break;
               
            // case "Remove Employee": // BONUS
            //    remEmp();
            //    break;
               
            case "Update Employee's Role":
               updateEmployeeRole();
               break;
               
            // case "Update Employee's Manager": // BONUS
            //    updEmpMan();
            //    break;
               
            case "View Roles": // DONE
            viewRoles();
            break;
            
            case "Add Role":
            addRole();
            break;
               
            // case "Remove Role": // BONUS
            //    remRole();
            //    break;
               
            case "View Departments": // DONE
            viewDepartments();
            break;
            
            case "Add Department":
            addDepartment();
            break;
               
            // case "Remove Department": // BONUS
            //    remDep();
            //    break;
               
            // case "View the total utilized budget of a department": // BONUS
            //    viewTotBudget();
            //    break;
               
            case "Exit":
               connection.end();
               break;
               };
            });
};

// mysql to Arrays ---------------------------------------------------------------------------------
const departmentsArr = [];
function depArray() {
   connection.query(`SELECT department FROM departments`, (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
         departmentsArr.push(res[i].department)
      }
   });
};
depArray();
      
const rolesArr = [];
function rolesArray() {
   connection.query(`SELECT role FROM roles`, (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
         rolesArr.push(res[i].role)
      }
   });
};
rolesArray();
      
      
      
// List of all Employees
// ------------------------------------------------------------------------------------------------
const queryEmployees = `SELECT employees.ID, CONCAT(employees.first_name," ", employees.last_name) AS employee,
                        roles.role, roles.salary, departments.department, 
                        CONCAT(manager.first_name, " ", manager.last_name) AS manager
                        FROM employees
                        JOIN roles ON employees.role_ID = roles.ID
                        JOIN departments ON departments.ID = roles.departments_ID
                        JOIN employees AS manager ON employees.manager_ID = manager.ID`;

function viewEmployees() {
   connection.query(queryEmployees, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// List of all Employees by Department
// ------------------------------------------------------------------------------------------------
function viewEmployeesDep() {
   inquirer.prompt({
      type: "list",
      name: "chooseDep",
      message: "Choose Department: ",
      choices: departmentsArr      
   })
   .then(answer => {
      connection.query(queryEmployeesDep, answer.chooseDep, (err, res) => { 
         if (err) throw err;
         console.table(res);
         run();
      });
   });

   queryEmployeesDep = `SELECT employees.ID, CONCAT(employees.first_name," ", employees.last_name) AS employee,
                        roles.role, roles.salary, departments.department, 
                        CONCAT(manager.first_name, " ", manager.last_name) AS manager
                        FROM employees
                        JOIN roles ON employees.role_ID = roles.ID
                        JOIN departments ON departments.ID = roles.departments_ID
                        JOIN employees AS manager ON employees.manager_ID = manager.ID
                        WHERE departments.department = ?`; // ? = answer.chooseDep
};


// List of all Roles
// ------------------------------------------------------------------------------------------------
function viewRoles() {
   const queryRoles = `SELECT ID, role, salary, departments_ID AS "department ID" FROM roles`;
   connection.query(queryRoles, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// List of all Departments
// ------------------------------------------------------------------------------------------------
function viewDepartments() {
   const queryDepartments = `SELECT ID, department FROM departments`;
   connection.query(queryDepartments, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};
