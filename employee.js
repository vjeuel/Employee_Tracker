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
   password: "",
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
         "Add Employee",
         "Update Employee's Role",
         // -----------------------------------
         "View Roles",
         "Add Role",
         // -----------------------------------
         "View Departments",
         "Add Department",
         // -----------------------------------
         // "View all Employees By Manager",
         // "Remove Employee",
         // "Update Employee's Manager",
         // "Remove Role",
         // "Remove Department",
         // "View the total utilized budget of a department",
         // -----------------------------------
         "Exit"
      ]
   })
      .then(answer => {
         switch (answer.general) {
            case "View all Employees":
            viewEmployees();
            break;
            
            case "Add Employee":
            addEmployee();
            break;
            
            case "Update Employee's Role": 
            updateEmployeeRole();
            break;
            
            case "View Roles":
            viewRoles();
            break;
            
            case "Add Role":
            addRole();
            break;
            
            case "View Departments":
            viewDepartments();
            break;
            
            case "Add Department":
            addDepartment();
            break;
            
            // Bonus --------------------------------------------------------------------------------
            // case "Remove Role":
            //    remRole();
            //    break;
            
            // case "Update Employee's Manager":
            //    updEmpMan();
            //    break;
            
            // case "Remove Employee":
            //    remEmp();
            //    break;
            
            // case "View all Employees By Manager":
            //    viewEmployeesMan();
            //    break;
               
            // case "Remove Department":
            //    remDep();
            //    break;
               
            // case "View the total utilized budget of a department":
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
   connection.query(`SELECT department, id FROM departments`, (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
         departmentsArr.push(res[i].department)
      }
   });
};
depArray();
      
const rolesArr = [];
function rolesArray() {
   connection.query(`SELECT id, title FROM roles`, (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
         rolesArr.push(res[i].title)
      }
   });
};
rolesArray();
      
const managersArr = [];
function managersArray() {
   connection.query(`SELECT DISTINCT CONCAT (manager.first_name, " ", manager.last_name) AS manager
                     FROM employees
                     JOIN employees AS manager ON manager.id = employees.manager_id`, (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
         managersArr.push(res[i].manager)
      }
   });
};
managersArray();

const employeesArr = [];
function employeesArray() {
   connection.query('SELECT CONCAT(first_name, " ", last_name) AS employee FROM employees', (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
         employeesArr.push(res[i].employee)
      }
   });
};
employeesArray();
      
// List of all Employees
// ------------------------------------------------------------------------------------------------
const queryEmployees = `SELECT employees.id, CONCAT(employees.first_name," ", employees.last_name) AS employee,
roles.title, roles.salary, departments.department, 
CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON departments.id = roles.departments_id
JOIN employees AS manager ON employees.manager_id = manager.id`;

function viewEmployees() {
   connection.query(queryEmployees, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// Add Employees
// ------------------------------------------------------------------------------------------------
function addEmployee() {
   inquirer.prompt([
      {
         type: "input",
         name: "first_name",
         message: "Type Employee first name"
      },
      {
         type: "input",
         name: "last_name",
         message: "Type Employee last name"
      },
      {
         type: "list",
         name: "title",
         message: "Choose a Role for the Employee",
         choices: rolesArr
      },
      {
         type: "list",
         name: "manager",
         message: "Choose Manager for this Employee",
         choices: managersArr
      }
   ])
      .then(answer => {
         connection.query(`SELECT id FROM roles WHERE title = "${answer.title}"`, (err, res) => {
            if (err) throw err;
            const addRole = res[0].id;

            connection.query(`SELECT id FROM employees WHERE CONCAT(first_name, " ",last_name) = "${answer.manager}"`, (err, res) => {
               if (err) throw err;
               const addMan = res[0].id;

               const queryAddEmployee = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${addRole}", "${addMan}")`;
               connection.query(queryAddEmployee, err => {
                  if (err) throw err;
                  console.log("The new Employee is part of your team!");
               })
               run();
            });
         });
      });
};

// List of all Roles
// ------------------------------------------------------------------------------------------------
function viewRoles() {
   const queryRoles = `SELECT id, title, salary, departments_id AS "department id" FROM roles`;
   connection.query(queryRoles, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// Add Role
// ------------------------------------------------------------------------------------------------
function addRole() {
   inquirer.prompt([
      {
         type: "input",
         name: "addRole",
         message: "Type the Role that you would like to add"
      },
      {
         type: "input",
         name: "salary",
         message: "Type the Salary for the new Role"
      },
      {
         type: "list",
         name: "department",
         message: "Choose a Department for the Role to be added to",
         choices: departmentsArr
      }
   ])
   .then(answer => {
      connection.query(`SELECT id FROM departments WHERE ?`, { department: answer.department }, (err, res) => {
         if (err) throw err;
         const addDep = res[0].id;
         
         const queryAddRole = `INSERT INTO roles (title, salary, departments_id) VALUES ("${answer.addRole}", "${answer.salary}", "${addDep}")`;
         connection.query(queryAddRole, err => {
            if (err) throw err;
            console.log("The Role has been added!");
            run();
         });
      });
   });
};

// Update Employee's Role
// ------------------------------------------------------------------------------------------------
function updateEmployeeRole() {
   inquirer.prompt([
      {
         type: "list",
         name: "chooseEmp",
         message: "Choose an Employee to be updated",
         choices: employeesArr,
      },
      {
         name: "list",
         name: "chooseRole",
         message: "Choose a new Role",
         choices: rolesArr,
      },
      {
         name: "list",
         name: "chooseMan",
         message: "Choose new Manager",
         choices: managersArr,
      }
   ])
      .then(answer => {
         console.log(employeesArr);
         console.log(rolesArr);
         console.log(managersArr);
         
         connection.query(`SELECT id FROM roles WHERE title = "${answer.chooseRole}"`, (err, res) => {
            if (err) throw err;
            const chosenRole = res[0].id;

            connection.query(`SELECT id FROM employees WHERE CONCAT(first_name, " ",last_name) = "${answer.chooseMan}"`, (err, res) => {
               if (err) throw err;
               const chosenMan = res[0].id;
            
               connection.query(`UPDATE employees SET role_id = ${chosenRole}, manager_id = ${chosenMan}, WHERE CONCAT(first_name, " ", last_name) = "${answer.chooseEmp}")`, err => {
                  if (err) throw err;
                  console.log("The Employee has been updated!");
               })
               // run();
            });
      
         });
      });
};

// List of all Departments
// ------------------------------------------------------------------------------------------------
function viewDepartments() {
   const queryDepartments = `SELECT id, department FROM departments`;
   connection.query(queryDepartments, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// List of all Departments
// ------------------------------------------------------------------------------------------------
function addDepartment() {
   inquirer.prompt([
      {
         type: "input",
         name: "addDepartment",
         message: "Type the Department that you would like to add"
      }
   ])
   .then(answer => {
      const queryAddDep = `INSERT INTO departments SET department = '${answer.addDepartment}'`;
         connection.query(queryAddDep, err => {
            if (err) throw err;
            console.log("The Department has been added!");
            run();
         });
      
      });
};