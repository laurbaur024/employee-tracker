


const inquirer = require('inquirer');
const connection = require("./config/connection");
const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./lib/views')
const { addDepartment, addRole, addEmployee, updateRole } = require ('./lib/queries')





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
      message: 'How would you like to begin?',
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

module.exports = {startPrompt}