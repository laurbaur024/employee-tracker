


const inquirer = require("inquirer");
const connection = require("../config/connection");


const viewAllDepartments = () => {
  connection.promise().query("SELECT * FROM departments", function (err, results) {
    console.log('Department Table')
    if (err) throw err;
    console.table(results);
    startPrompt()

  });
}

// function viewAllDepartments(data) {
//   connection.query("SELECT * FROM departments", function (err, results) {
//     console.log(results);
//     res.results(200).json({results})
//   });
// }

function viewAllRoles(data){
  console.log("\n");
  console.table(data);
}

function viewAllEmployees(data){
  console.log("\n");
  console.table(data);
}



module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
}