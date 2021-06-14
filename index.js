const inquirer = require('inquirer');
const db = require('./db/connection');

async function startApp() {
	departmentList();

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
	// console.log(response);

	switch (response.initialQuestions) {
		case 'View all departments':
			viewDept();
			break;

		case 'View all roles':
			viewRoles();
			break;

		case 'View all employees':
			viewEmployees();
			break;

		case 'Add a department':
			addDept();
			break;

		case 'Add a role':
			addRole();
			break;

		case 'Add an employee':
			await addEmployee();
			break;

		case 'Update an employee role':
			updateEmployeeRole();
			break;
	}
}

startApp();

function departmentList() {
	let listOfDepartments = [];
	db.query(`SELECT * FROM department`, (err, data) => {
		data.forEach((department) => {
			listOfDepartments.push(department.name);
		});
	});
	return listOfDepartments;
}
// function employeeList () {
// 	let employees = [];
// 	db.query(`SELECT * FROM employee`, (err, data) => {
// 		data.forEach((employee) => {
// 			employees.push(employee);
// 		});
// 	});
// 	return employees;
// }

//Later seperation of concerns into another folder these fx
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
const viewEmployees = () => {
	const query = `SELECT * FROM employee;`;
	db.query(query, function (err, res) {
		if (err) throw err;
		console.table(res);
		startApp();
	});
};

const addDept = () => {
	inquirer
		.prompt([
			{
				name: 'addNewDept',
				message: 'What is the name of the new department you wish to add?',
			},
		])
		.then((response) => {
			db.query('INSERT INTO department(name) VALUES (?)', [response.addNewDept], (err, data) => {
				if (err) throw err;
				console.log(data);
				startApp();
			});
		});
};

const addRole = () => {
	inquirer
		.prompt([
			{
				name: 'addNewRole',
				message: 'What role do you wish to add?',
			},
			{
				name: 'payRollAmt',
				message: 'How much would you like to pay (annual salary) for this role?',
			},
			{
				name: 'deptList',
				message: 'Which department would you like to assign this role to?',
				type: 'list',
				choices: departmentList(),
			},
		])
		.then((response) => {
			console.log(response.deptList);
			db.query(
				`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`,
				[
					response.addNewRole,
					response.payRollAmt,
					listOfDepartments.indexOf(response.deptList) + 1,
					//added +1 here because the index is off by one from the id e.g. sales index is '0' and the id is '1'
				],
				// console.log(response.deptList),
				(err, data) => {
					if (err) throw err;
					console.log(data);
					startApp();
				}
			);
		});
};

const addEmployee = async () => {
	const roles = await db.promise().query(`SELECT * FROM role`);
	const manager = await db.promise().query(`SELECT manager_id FROM employee`);

	const roleArr = roles[0].map((role) => role.title);
	const roleMap = roles[0].reduce((map, currentItem) => {
		map[currentItem.title] = currentItem.id;
		return map;
	}, {});

	const managerArr = manager[0].map((employee) => employee.manager_id);
	const managerMap = manager[0].reduce((map, currentItem) => {
		map[currentItem.manager_id] = currentItem.manager_id;
		return map;
	}, {});

	inquirer
		.prompt([
			{
				name: 'employeeFirstName',
				text: 'What is the first name of the new employee?',
			},
			{
				name: 'employeeLastName',
				text: 'What is the last name of the new employee?',
			},
			{
				name: 'employeeRole',
				text: 'Please enter the new employee role.',
				type: 'list',
				choices: roleArr,
			},
			{
				name: 'employeeMgr',
				text: 'Please enter the manager id for this employee.',
				type: 'list',
				choices: managerArr,
			},
		])
		.then((response) => {
			const roleId = roleMap[response.employeeRole];
			const mgrId = managerMap[response.employeeMgr];

			db.query(
				`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
				[response.employeeFirstName, response.employeeLastName, roleId, mgrId],
				(err, data) => {
					if (err) {
						throw err;
					}
					console.log(data);
				}
			);
		});
};

const updateEmployeeRole = async () => {
	let employee = await db.promise().query(`SELECT first_name FROM employee`);
	let employeeList = employee[0].map((employeeName) => employeeName.first_name);
	let roleUpdate = await db.promise().query(`SELECT * FROM role`);
	let roleChoice = roleUpdate[0].map(role => role.title );
	// console.log(roleUpdate)
	inquirer.prompt([
		{
			name: 'employeeName',
			message: 'Please choose an employee to update.',
			type: 'list',
			choices: employeeList,
		},
		{
			name: 'employeeRoleUpdate',
			message: 'Please select their new role.',
			type: 'list',
			choices: roleChoice
		}
		
	])
.then( (response) => {
	console.log(response)
	startApp();
	}

	//response = job name
	//job name = id
	// db.promise().query(`UPDATE employee SET role_id = ? WHERE first_name = ?`,
	// [
	// 	3,
	// 	"response.employeeName"
	// ]
	
)
}