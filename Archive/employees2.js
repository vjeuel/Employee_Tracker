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
            
            case "View all Employees By Manager": // DONE
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
            
            case "Add Department": // DONE
               addDep();
               break;
               
            case "Remove Department": // DONE
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
   JOIN employees AS manager ON employees.manager_id = manager.id;`;
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
   inquirer.prompt({
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
   const query = `SELECT DISTINCT CONCAT(manager.first_name, " ", manager.last_name) AS name FROM employees
   JOIN employees AS manager ON manager.id = employees.manager_id;`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      const manager = [];
      for (let i = 0; i < res.length; i++) {
         manager.push(res[i].name);
      }
      askEmpMan(manager)
   });
}

function askEmpMan(manager){
   inquirer.prompt({
      type: "list",
      name: "chooseMan",
      message: "Choose Manager: ",
      choices: manager
   })
   .then(answer => {
      listEmpMan(answer.chooseMan);            
   });
}

function listEmpMan(manager){
   const query = `SELECT employees.id,CONCAT (employees.first_name, " ", employees.last_name) AS employee, role.role,
    role.salary, departments.department AS department FROM employees JOIN role ON employees.role_id = role.id 
    JOIN employees AS manager ON employees.manager_id = manager.id JOIN departments ON departments.id = role.departments_id
    WHERE CONCAT(manager.first_name, " ", manager.last_name) = "${manager}";`;
   connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
   });
}

// Add Employee
// ------------------------------------------------------------------------------------------------
function addEmp() {
   const newEmp = {
      first_name: "",
      last_name: "",
      role_id: 0,
      manager_id: 0
   }

   inquirer.prompt([{
      name: "first_name",
      type: "input",
      message: "Type new Employee first name: "
      },
      {
      name: "last_name",
      type: "input",
      message: "Type new Employee last name: "
      },
      {
      name: "role",
      type: "list",
      message: "Choose a role for the new Employee",
      choices: "???????????????????????"   
      },
      {
      name: "department",
      type: "input",
      message: "Choose a department for the new Employee",
      choices: "??????????????????????"
      }

   ])
}


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


// Add Role
// ------------------------------------------------------------------------------------------------


// Remove Role
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

// Add Department
// ------------------------------------------------------------------------------------------------
function addDep() {
   inquirer.prompt({
      name: "department",
      type: "input",
      message: "Add new Department:",
   })
   .then((answer) => {
      const query = `INSERT INTO departments (department) VALUES (?);`;
      connection.query(query, [answer.department], (err, res) => {
         if (err) throw err;
          const departments = [];
        for (let i = 0; i < res.length; i++) {
            departments.push(res[i].department);
        }
         console.log("The new Department has been added");
         run();
      })
   })
}


// Remove Department
// ------------------------------------------------------------------------------------------------
function remDep() {
    const query = `SELECT id, departments.department FROM departments;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        const departments = [];
        const depNames = [];
        for (let i = 0; i < res.length; i++) {
            departments.push({
                id: res[i].id,
                name: res[i].department});
            depNames.push(res[i].department);    
        }
        inquirer.prompt({
            name: "chooseDep",
            type: "list",
            message: "Choose Department to be removed",
            choices: depNames 
          })
        .then(answer => {
             let chosenDepId;
             for (let i = 0; i < departments.length; i++) {
               if (departments[i].name === answer.chooseDep) {
                 chosenDepId = departments[i].id;
                 break;
               }
             }
             const query = "DELETE FROM departments WHERE ?";
             connection.query(query, {id: chosenDepId}, (err, res) => {
                if (err) throw err;
                console.log("Department Removed");
                run();
            });
        }); 
    });
}

function viewTotBudget() {
   const query = `SELECT departments.department, SUM(role.salary) AS Total_Budget FROM role JOIN departments JOIN employees
   WHERE role.id = employees.id and role.id = departments.id GROUP BT role.id;`
}