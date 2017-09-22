module.exports = function mhsearch(connection,res,mysql,data){
	connection.connect();
	
	connection.query('SELECT * FROM goods WHERE text LIKE "%'+data.val+'%"',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});

	connection.end();
}