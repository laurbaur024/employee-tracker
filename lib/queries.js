


const inquirer = require("inquirer");
const connection = require("../config/connection");
const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require("./views");


/*
  We are making use of a mysql2 method called promise() which allows us to 
  perform our database query asynchronously. This means we don't need to use
  .then() blocks or callback functions, which makes it much easier run the queries 
  and return values from them.
*/

// function listAllDepartments(){
//   return connection.promise().query("SELECT department.id, department.name FROM department;");
// }

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
module.exports = {
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
}