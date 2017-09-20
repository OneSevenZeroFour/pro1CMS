//引入express框架
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');

var app = express();
app.listen(3000,function(){
	console.log('server start, port' + 3000);
});

//配置连接的参数
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'first_project'
});
connection.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname,'../')))

var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, '../uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});

app.post('/fileupload', upload.any(), function(req, res, next) {	
	res.append("Access-Control-Allow-Origin","*");
	console.log(req.files);
	var arr = [];
	req.files.forEach(function(ele,idx){
		arr.push(ele.filename)
	})
	var obj = {
		status : 'success',
		imgUrl : arr
	}
	res.send(JSON.stringify(obj));
	
});

app.post('/insert',function(req,res){
	var result = JSON.parse(req.body.data);
	/*
		goodsType : $('#goodsType').val(),
		goodsPrice : $('#goodsPrice').val(),
		goodsOldPrice : $('#goodsOldPrice').val(),
		goodsSaleNum : $('#goodsSaleNum').val(),
		goodsLastNum : $('#goodsLastNum').val(),
		goodsSize : $('#goodsSize').val(),
		goodsDescription : $('#goodsDescription').val(),
		goodsText : $('#goodsText').val(),
		imgList : imgList
	*/

	var sql = "insert into goods(good_type,price,old_price,text,sale_num,last_num,sizes,des,gl_b_imgs,gl_s_imgs,gd_b_imgs,gd_s_imgs)";
	sql += ` values('${result.goodsType}',${parseFloat(result.goodsPrice)},${parseFloat(result.goodsOldPrice)},'${result.goodsText}',`;
	sql += `${Number(result.goodsSaleNum)},${Number(result.goodsLastNum)},'${result.goodsSize}','${result.goodsDescription}',`;
	sql += `'${result.imgList.list_big[0]}','${result.imgList.list_small[0]}','${JSON.stringify(result.imgList.detail_big)}',`;
	sql += `'${JSON.stringify(result.imgList.detail_small)}')`;

	connection.query(sql,function(err,result,fields){
		var obj = {
			status : true,
			data : result
		}
		res.send(JSON.stringify(obj));
	})
})