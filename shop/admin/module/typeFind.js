module.exports = function typeFind(connection,res,mysql,data){
	connection.connect();
	
	var s = '';
	var index = 0;
	
	if(data.index){
		index = data.index*10
	}else{
		index = 0;
	};
	
	if(data.type == '*'){
		s = 'SELECT * FROM goods LIMIT '+index+',10';
	}else{
		s = 'SELECT * FROM goods WHERE good_type="'+data.type+'" LIMIT '+index+',10';
	}
	
	connection.query(s,function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});

	connection.end();
}