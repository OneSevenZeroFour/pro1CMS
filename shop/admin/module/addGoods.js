module.exports = function addGoods(connection,res,mysql,data){
	connection.connect();

	connection.query('INSERT INTO goods(text,price,old_price,good_type,sale_num,last_num,sizes) VALUES ("'+data.text+'","'+data.price+'","'+data.old_price+'","'+data.good_type+'","'+data.sale_num+'","'+data.last_num+'","'+data.sizes+'")',function(err,result,fields){
		if(err){
			throw err;
		}else{
			res.send(JSON.stringify(result));
		};
	});
	
	connection.end();
}