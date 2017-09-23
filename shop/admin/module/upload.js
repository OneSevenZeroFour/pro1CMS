var connection = require('./connection')();

module.exports = function addGoods(res, result) {
    /*
	 			goodsType: $('#goodsType').val(),
                goodsPrice: $('#goodsPrice').val(),
                goodsOldPrice: $('#goodsOldPrice').val(),
                goodsSaleNum: $('#goodsSaleNum').val(),
                goodsLastNum: $('#goodsLastNum').val(),
                goodsText: $('#goodsText').val(),
                goodsSize: that.goodsSize,
                goodsDescription: that.goodsDescription,
                goodsId: that.id ? that.id : '',
                imgList: that.imgList,
	*/
    if (result.goodsId) {
        var sql = "update goods set";
        sql += ` good_type='${result.goodsType}',price=${result.goodsPrice},old_price=${result.goodsOldPrice},`;
        sql += `text='${result.goodsText}',sale_num=${result.goodsSaleNum},last_num=${result.goodsLastNum},sizes='${result.goodsSize}',`;
        sql += `des='${result.goodsDescription}',gl_b_imgs='${result.imgList.list_big}',gl_s_imgs='${result.imgList.list_small}',`;
        sql += `gd_b_imgs='${result.imgList.detail_big}',gd_s_imgs='${result.imgList.detail_small}' where`;
        sql += ` good_id=${result.goodsId}`;
        //res.send(sql)
    } else {
        var sql = "insert into goods(good_type,price,old_price,text,sale_num,last_num,sizes,des,gl_b_imgs,gl_s_imgs,gd_b_imgs,gd_s_imgs)  values";
        sql += ` ('${result.goodsType}',${result.goodsPrice},${result.goodsOldPrice},'${result.goodsText}',`;
        sql += `${result.goodsSaleNum},${result.goodsLastNum},'${result.goodsSize}','${result.goodsDescription}',`;
        sql += `'${result.imgList.list_big}','${result.imgList.list_small}','${result.imgList.detail_big}',`;
		sql += `'${result.imgList.detail_small}')`;
		//res.send(sql)
    }

    connection.query(sql, function(err, result, fields) {
        var obj = {
            status: true,
            data: result
        }
        res.send(JSON.stringify(obj));
    })
}