module.exports = function addtype(connection,res,mysql,data){

	connection.connect();

	connection.query('INSERT INTO good_type(good_type) VALUES ("'+data.good_type+'")',function(err,result,fields){
		if(err){
			throw err;
		}
	});
	
	connection.end();
}