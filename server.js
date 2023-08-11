


const inquirer = require('inquirer');
const connection = require("./config/connection");


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
        // 'Add an employee',
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
      // if (choices === "Add an employee") {
      //   addEmployee();
      // }
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
  const allDepartments = []
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err
    res.forEach(dept=> {
      let deptList = {
        name: dept.name,
        value: dept.id
      }
      allDepartments.push(deptList)
    })
  })
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
    },
    {
      type: 'list',
      name: 'newRoleDept',
      choices: allDepartments,
      message: "What is the role's department?"
    }
  ])
  .then(response => {
    connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?)',
    [[response.newRole, response.newSalary, response.newRoleDept]], (err,res) => {
      if (err) throw err
      console.log(`Added ${response.newRole} to roles.`)
      viewAllRoles()
    })
  })
}


function updateRole() {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err
    const allEmployees = []
    res.forEach(({ first_name, id}) => {
      allEmployees.push({
        name: first_name,
        value: id
      })
    })
    connection.query('SELECT * FROM roles', (err, res) => {
      if (err) throw err
      const allRoles = []
      res.forEach(({ title, id }) => {
        allRoles.push({
          name: title,
          value: id
        })
      })
      inquirer.prompt([
          {
            type: 'list',
            name: 'employees',
            choices: allEmployees,
            message: "What employee would you like to update?"
          },
          {
            type: 'list',
            name: 'roles',
            choices: allRoles,
            message: "What is the employee's new role?"
          }
      ])
      .then(response => {
        connection.query('UPDATE employee SET ? Where ?? = ?', 
        [{role_id: response.role_id}, 'id', response.id]
        , (err, res) => {
          if (err) throw err
          console.log(`Updated employee's role.`)
          viewAllEmployees()
        })
      })
    })
  })
}

// function addEmployee() {
//   inquirer.prompt ([
//     {
//       type: 'input',
//       name: "newEmployeeFirst",
//       message: "What is the first name of the employee?"
//     },
//     {
//       type: 'input',
//       name: "newEmployeeLast",
//       message: "What is the last name of the employee?"
//     },
//     {
//       type: 'list',
//       name: 'newRoleEmployee',
//       choices: '', 
//       message: "What is the employee's role?"
//     },
//     {
//       type: 'list',
//       name: 'newManagerEmployee',
//       choices:'',
//       message: "Who is the employee's manager?"
//     }
//   ])
// }