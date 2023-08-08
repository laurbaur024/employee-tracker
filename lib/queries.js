


const inquirer = require("inquirer");
const connection = require("../config/connection");


/*
  We are making use of a mysql2 method called promise() which allows us to 
  perform our database query asynchronously. This means we don't need to use
  .then() blocks or callback functions, which makes it much easier run the queries 
  and return values from them.
*/

function listAllDepartments(){
  return connection.promise().query("SELECT department.id, department.name FROM department;");
}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateRole() {

}
module.exports = {
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
}