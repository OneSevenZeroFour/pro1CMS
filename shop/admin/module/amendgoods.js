module.exports = function amendgoods(connection,res,mysql,data){
	connection.connect();

	connection.query('UPDATE goods SET text="'+data.text+'",price="'+data.price+'",old_price="'+data.old_price+'",good_type="'+data.good_type+'",sale_num="'+data.sale_num+'",last_num="'+data.last_num+'",sizes="'+data.sizes+'" WHERE good_id="'+data.id+'"',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send('修改成功');
		};
	});
	
	connection.end();
}