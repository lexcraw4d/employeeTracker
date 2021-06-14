const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'localhost',
	// Your MySQL username,
	user: 'root',
	// Your MySQL password
	password: 'gamecocks',
  //Database to be used
	database: 'employeeTracker',
});

console.table(
	`
╔═══╗─────╔╗
║╔══╝─────║║
║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗
║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣
║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣
╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝
───────║║──────╔═╝║
───────╚╝──────╚══╝
╔═╗╔═╗
║║╚╝║║
║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
──────────────╔═╝║
──────────────╚══╝`,
);

module.exports = db;
