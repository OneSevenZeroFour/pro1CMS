var mysql = require('mysql');

module.exports = function () {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'first_project'
	});
	connection.connect();
	return connection;
};