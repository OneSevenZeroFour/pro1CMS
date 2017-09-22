var express = require("express");
//初始化第一个express应用程序
var app = express();
//指定根目录下的pubilc文件夹作为静态资源的存放地方(css,js,html,json,jpg)
app.use(express.static('header_photo'));

var multer = require('multer');

var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, './header_photos')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
//往multer去配置这个存放文件的信息
var upload = multer({
	storage: storage
});
app.post('/profile', upload.any(), function(req, res, next) {
	
})
//监听端口，并打开服务器
app.listen(8888);
console.log("开启服务器");