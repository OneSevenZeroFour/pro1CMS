var connection = require('./connection')();

module.exports = function typeFind(res, data) {
	//connection.connect();

	var s = '';
	var index = 0;

	if (data.index) {
		index = data.index * 6
	} else {
		index = 0;
	};

	if (data.type == '*') {
		s = 'SELECT * FROM goods LIMIT ' + index + ',6';
	} else if (data.type == 'text') {
		s = "SELECT * FROM goods WHERE " + data.type + " LIKE '%" + data.val + "%' LIMIT " + index + ",6";
	} else {
		s = 'SELECT * FROM goods WHERE good_type="' + data.type + '" LIMIT ' + index + ',6';
	}

	connection.query(s, function (err, result, fields) {
		if (err) {
			throw err;
		} else {
			res.send(JSON.stringify(result));
		};
	});

	//connection.end();
}