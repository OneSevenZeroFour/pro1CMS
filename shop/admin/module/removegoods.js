module.exports = function addGoods(connection,res,mysql,data){
	connection.connect();
	
	connection.query('DELETE FROM goods WHERE good_id="'+data.id+'"',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
			console.log('删除成功')
		};
	});
	
	connection.end();
}