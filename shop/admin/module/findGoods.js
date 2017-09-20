module.exports = function mysql(connection,res,mysql,data){
	var index = 0;
	if(data.index){
		index = data.index*10
	}else{
		index = 0;
	};
	
	connection.connect();
	
	connection.query('SELECT * FROM goods limit '+index+',10',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});
	connection.end();
}
