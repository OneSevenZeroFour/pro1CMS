module.exports = function page(connection,res,mysql,data){
	var s = ''
	
	if(data.type == '*'){
		var s = 'SELECT COUNT(*) FROM goods';
	}else if(data.type == 'text'){
		var s = "SELECT COUNT(*) FROM goods WHERE "+data.type+" LIKE '%"+data.val+"%'"
	}else{
		var s = 'SELECT COUNT(*) FROM goods WHERE good_type="'+data.type+'"';
	}
	
	connection.connect();
	
	connection.query(s,function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});
	
	connection.end();
};