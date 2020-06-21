const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

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
               askEmpDep();
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
            
            case "Update Employee's Role":
               updEmpRole();
               break;
            
            case "Update Employee's Manager":
               updEmpMan();
               break;
            
            case "View Roles":
               viewRole();
               break;

            case "Add Role":
               addRole();
               break;
               
            case "Remove Role":
               remRole();
               break;
         
            case "View Department":
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
function viewEmp() {
   const query = `SELECT employees.id, CONCAT(employees.first_name," ", employees.last_name) AS employee, role.role, 
      role.salary, departments.department, CONCAT(manager.first_name, " ", manager.last_name) AS manager 
      FROM employees 
      JOIN role ON employees.role_id = role.id
      JOIN departments ON departments.id = role.departments_id JOIN employees as manager ON employees.manager_id = manager.id;`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// List of all Employees by Department
function viewEmpDep(departments) {
      const query =
      `SELECT employees.id, concat(employees.first_name," ", employees.last_name) AS employee, role.role, 
   role.salary, concat(manager.first_name, " ", manager.last_name) AS manager 
   FROM employees 
   JOIN role ON employees.role_id = role.id INNER JOIN employees AS manager ON employees.manager_id = manager.id
   JOIN departments ON departments.id = role.departments_id WHERE departments.department = "${departments}";`;
   connection.query(query, (err, res) => {
         if (err) throw err;
      console.table(res);
      run();
   });
};

// List of Departments
function viewDep() {
   const query = `SELECT id, department FROM departments`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};

// List of Roles
function viewRole() {
   const query = `SELECT id, role, salary, departments_id FROM role`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
};
