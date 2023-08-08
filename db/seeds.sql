USE employee_db;

INSERT INTO department (name)
VALUES 
  ("Sales"),
  ("Finance"),
  ("Marketing"),
  ("Human Resources"),
  ("Support");

INSERT INTO roles (title, salary, department_id)
VALUES 
  ("Salesman", 50000, 1),
  ("Accountant", 80000, 2),
  ("Marketer", 70000, 3),
  ("Human Resource Professional", 75000, 4),
  ("Support Technician", 90000, 5),
  ("Manager", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ("Kelly", "Clarkson", 1, null),
  ("Britney", "Spears", 2, 1),
  ("Christina", "Aguilera", 3, 1),
  ("Lady", "Gaga", 4, 1),
  ("Taylor", "Swift", 5, 1);
