module.exports = function connection(mysql){
	var connection = mysql.createConnection({
		host:'rm-wz9w4v621xko71doxo.mysql.rds.aliyuncs.com',
		user:'xiaoxiaoyuan',
		password:'yzl00-00yzl',
		database:'cms'
	});
	return connection;
};
