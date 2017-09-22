var connection = require('./connection')();

module.exports = function addGoods(res,result){
	//console.log(result)
	if(result.goodsId){
		var sql = "update goods set";
		sql += ` good_type='${result.goodsType}',price=${parseFloat(result.goodsPrice)},old_price=${parseFloat(result.goodsOldPrice)},`;
		sql += `text='${result.goodsText}',sale_num=${Number(result.goodsSaleNum)},last_num=${Number(result.goodsLastNum)},sizes='${result.goodsSize}',`;
		sql += `des='${result.goodsDescription}',gl_b_imgs='${result.imgList.list_big[0]}',gl_s_imgs='${result.imgList.list_small[0]}',`;
		sql += `gd_b_imgs='${JSON.stringify(result.imgList.detail_big)}',gd_s_imgs='${JSON.stringify(result.imgList.detail_small)}' where`;
		sql += ` good_id=${result.goodsId}`;
		//res.send(sql)
	}else{
		var sql = "insert into goods(good_type,price,old_price,text,sale_num,last_num,sizes,des,gl_b_imgs,gl_s_imgs,gd_b_imgs,gd_s_imgs)  values";
		sql += ` ('${result.goodsType}',${parseFloat(result.goodsPrice)},${parseFloat(result.goodsOldPrice)},'${result.goodsText}',`;
		sql += `${Number(result.goodsSaleNum)},${Number(result.goodsLastNum)},'${result.goodsSize}','${result.goodsDescription}',`;
		sql += `'${result.imgList.list_big[0]}','${result.imgList.list_small[0]}','${JSON.stringify(result.imgList.detail_big)}',`;
		sql += `'${JSON.stringify(result.imgList.detail_small)}')`;
	}

	connection.query(sql,function(err,result,fields){
		var obj = {
			status : true,
			data : result
		}
		res.send(JSON.stringify(obj));
	})
}