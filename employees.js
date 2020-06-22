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
            case "View all Employees": // DONE
               viewEmp();
               break;

            case "View all Employees By Department": // DONE
               viewEmpDep();
               break;
            
            case "View all Employees by Manager":
               viewEmpMan();
               break;
            
            case "Add Employee":
               addEmp();
               break;
               
            case "Remove Employee":
               remEmp();
               break;
               
            case "Update Employee's Role":
               updEmpRole();
               break;
               
            case "Update Employee's Manager":
               updEmpMan();
               break;
               
            case "View Roles": // DONE
            viewRole();
            break;
            
            case "Add Role":
               addRole();
               break;
               
            case "Remove Role":
               remRole();
               break;
               
            case "View Department": // DONE
            viewDep();
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



// List of all Employees
// ------------------------------------------------------------------------------------------------
function viewEmp() {
   const query = `SELECT employees.id, CONCAT(employees.first_name," ", employees.last_name) AS employee, role.role, 
   role.salary, departments.department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees 
   JOIN role ON employees.role_id = role.id JOIN departments ON departments.id = role.departments_id
   JOIN employees as manager ON employees.manager_id = manager.id;`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// List of all Employees by Department
// ------------------------------------------------------------------------------------------------
function viewEmpDep(){
   const query = `SELECT departments.department FROM departments;`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      const departments = [];
      for (let i = 0; i < res.length; i++) {
         departments.push(res[i].department);
      }
      askEmpDep(departments)
   });
}

function askEmpDep(departments){
   inquirer
   .prompt({
      type: "list",
      name: "chooseDep",
      message: "Choose Department: ",
      choices: departments
   })
   .then(answer => {
      listEmpDep(answer.chooseDep);            
   });
}

function listEmpDep(departments){
   const query = `SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) AS employee, role.role,
   role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees
   JOIN role ON employees.role_id = role.id JOIN employees AS manager ON employees.manager_id = manager.id
   JOIN departments ON departments.id = role.departments_id
   WHERE departments.department = "${departments}";`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
}

//  List of all Employees by Manager
// ------------------------------------------------------------------------------------------------
function viewEmpMan(){
   const query = `SELECT departments.department FROM departments;`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      const departments = [];
      for (let i = 0; i < res.length; i++) {
         departments.push(res[i].department);
      }
      askEmpMan(departments)
   });
}

function askEmpMan(departments){
   inquirer
   .prompt({
      type: "list",
      name: "chooseDep",
      message: "Choose Department: ",
      choices: departments
   })
   .then(answer => {
      listEmpMan(answer.chooseDep);            
   });
}

function listEmpMan(departments){
   const query = `SELECT `;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
}

// Add Employee
// ------------------------------------------------------------------------------------------------



// List of Departments
// ------------------------------------------------------------------------------------------------
function viewDep() {
   const query = `SELECT id, department FROM departments`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// List of Roles
// ------------------------------------------------------------------------------------------------
function viewRole() {
   const query = `SELECT id, role, salary, departments_id FROM role`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// ------------------------------------------------------------------------------------------------