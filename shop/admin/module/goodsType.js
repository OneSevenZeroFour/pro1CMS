module.exports = function goodsType(connection,res,mysql,data){
	connection.connect();
	
	connection.query('SELECT * FROM good_type',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});
	connection.end();
}