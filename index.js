const inquirer = require('inquirer');
const db = require ('./db/connection')

async function startApp() {
	let response = await inquirer.prompt([
		{
			name: 'initialQuestions',
			type: 'list',
			message: 'Please make a selection',
			choices: [
				'View all departments',
				'View all roles',
				'View all employees',
				'Add a department',
				'Add a role',
				'Add an employee',
				'Update an employee role',
			],
		},
	]);
	console.log(response);

	switch (response.initialQuestions) {
		case 'View all departments':
			viewDept();
			break;

		case 'View all roles':
			viewRoles();
			break;

		case 'View all employees':
			viewDept();
			break;

		case 'Add a department':
			addDept();
			break;

		case 'Add a role':
			addRole();
			break;

		case 'Add an employee':
			addEmployee();
			break;

		case 'Update an employee role':
			updateEmployeeRole();
			break;
	}
}

startApp();

const viewDept = () => {
    const query = `SELECT * FROM department;`;
    db.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      startApp();
    });
  };

const viewRoles = () => {
    const query = `SELECT * FROM role;`;
    db.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      startApp();
    });
  };
