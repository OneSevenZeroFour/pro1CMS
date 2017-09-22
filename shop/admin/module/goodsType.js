var connection = require('./connection')();
//console.log(connection)
module.exports = function goodsType(res){
	//connection.connect();
	
	connection.query('SELECT DISTINCT good_type FROM goods',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});
	//connection.end();
}