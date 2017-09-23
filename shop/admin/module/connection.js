var mysql = require('mysql');

module.exports = function () {
	var connection = mysql.createConnection({
<<<<<<< HEAD
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'first_project'
=======
		host:'rm-wz9w4v621xko71doxo.mysql.rds.aliyuncs.com',
		user:'xiaoxiaoyuan',
		password:'yzl00-00yzl',
		database:'cms'
>>>>>>> 5a6446089f36ce9c337eeb827991f0b20b64e1ed
	});
	connection.connect();
	return connection;
};