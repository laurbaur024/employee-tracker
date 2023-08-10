


const inquirer = require('inquirer');
const connection = require("./config/connection");
// const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./lib/views')
// const { addDepartment, addRole, addEmployee, updateRole } = require ('./lib/queries')





connection.connect (err => {
  if (err) throw err;
  console.log("___________________________________")
  console.log("|           WELCOME TO            |")
  console.log("|        EMPLOYEE TRACKER         |")
  console.log("|               ＄                |")
  console.log("___________________________________")
  console.log("")
  startPrompt();
})




function startPrompt() {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'choices',
      message: 'Please make a selection.',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        'Exit',]
    }
  ])
    .then((choice) => {
      const { choices } = choice;

      if (choices === "View all departments") {
        viewAllDepartments();
      }
      if (choices === "View all roles") {
        viewAllRoles();
      }
      if (choices === "View all employees") {
        viewAllEmployees();
      }
      if (choices === "Add a department") {
        addDepartment();
      }
      if (choices === "Add a role") {
        addRole();
      }
      if (choices === "Add an employee") {
        addEmployee();
      }
      if (choices === "Update employee role") {
        updateRole();
      }
      if (choices === "Exit") {
        console.log("Goodbye!")
        connection.end()
      }
    })
}



function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.table(result)
    console.log("Viewing all departments.")
    startPrompt()
  }
  )
}

function viewAllRoles(){
  connection.query("SELECT * FROM roles", function (err, result) {
    if (err) throw err;
    console.table(result)
    console.log("Viewing all roles.")
    startPrompt()
  }
  )
}

function viewAllEmployees(){
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    console.table(result)
    console.log("Viewing all employees.")
    startPrompt()
  }
  )
}

function addDepartment() {
  inquirer.prompt ([
    {
      type: 'input',
      name: "newDept",
      message: "What is the name of the department?"
    }
  ])
  .then(response => {
    connection.query(`INSERT INTO department (name) VALUES (?)`, response.newDept, (err, res) => {
      if (err) throw err;
      console.log(`${response.newDept} added to departments!`)
      viewAllDepartments()
    })
  })
}

function addRole() {
  inquirer.prompt ([
    {
      type: 'input',
      name: "newRole",
      message: "What is the name of the role?"
    },
    {
      type: "input",
      name: "newSalary",
      message: "What is the salary of the new role?"
    }
  ])
}

function addEmployee() {
  inquirer.prompt ([
    {
      type: 'input',
      name: "newEmployeeFirst",
      message: "What is the first name of the employee?"
    },
    {
      type: 'input',
      name: "newEmployeeLast",
      message: "What is the last name of the employee?"
    },
  ])
}

function updateRole() {

}