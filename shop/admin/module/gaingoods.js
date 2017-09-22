var connection = require('./connection')();

module.exports = function gaingoods(res,data){
	//	connection.connect();
	connection.query('SELECT * FROM goods WHERE good_id="'+data.id+'"',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});
	//connection.end();
}
