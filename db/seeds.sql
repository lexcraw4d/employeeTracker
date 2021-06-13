USE employeeTracker;

-- INSERT INTO department
INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('IT'),
('HR');


-- -- INSERT INTO role
INSERT INTO role  (title, salary, department_id)

VALUES 
('Operations Manager', 800000, 1),
('Quality Control', 500000, 2),
('Accountant', 900000, 3),
('Receptionist', 600000, 3),
('Marketing Manager', 700000, 4);
-- INSERT INTO employee
INSERT INTO employee  (first_name, last_name, role_id, manager_id)
VALUES
('Tony', 'Soprano', 1, 1),
('Christopher', 'Moltisanti', 2, 1),
('Carmela', 'Soprano', 2, 1),
('Tony', 'Blundetto', 3, 1),
('Paulie', 'Gualtieri', 4, 1);
