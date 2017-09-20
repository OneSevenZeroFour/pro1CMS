module.exports = function page(connection,res,mysql){
	connection.connect();
	
	connection.query('SELECT COUNT(*) FROM goods',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});
	connection.end();
};