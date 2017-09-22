var connection = require('./connection')();

module.exports = function addGoods(res,data){
	//connection.connect();
	
	connection.query('DELETE FROM goods WHERE good_id="'+data.id+'"',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send('删除成功');
		};
	});
	
	//connection.end();
}