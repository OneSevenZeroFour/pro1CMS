var bodyParser = require('body-parser');
var multer = require('multer');

module.exports = function router(app) {
	
	//添加body-parser multer 插件
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({
		extended: true
	})); // for parsing application/x-www-form-urlencoded

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

	//设置路由

	app.get('/page', function (req, res) {
		var data = req.query;
		//导入分页模块
		require('../module/page.js')(res, data);
	});

	app.get('/addgoods', function (req, res) {
		var data = req.query;

		//	//导入添加模块
		require('../module/addGoods.js')(res, data);
	});

	app.get('/removegoods', function (req, res) {
		var data = req.query;

		//导入删除模块
		require('../module/removegoods.js')(res, data);
	});

	app.get('/gaingoods', function (req, res) {
		var data = req.query;

		//导入ID获取信息模块
		require('../module/gaingoods.js')(res, data);
	});

	app.get('/amendgoods', function (req, res) {
		var data = req.query;

		//导入修改模块
		require('../module/amendgoods.js')(res, data);
	});

	app.get('/goodsType', function (req, res) {

		//导入商品类型数量查找模块
		require('../module/goodsType.js')(res);
	});

	app.get('/typeFind', function (req, res) {
		var data = req.query;

		//导入商品类型查找模块
		require('../module/typeFind.js')(res, data);
	});

	app.get('/mhsearch', function (req, res) {
		var data = req.query;

		//导入商品类型查找模块
		require('../module/mhsearch.js')(res, data);
	});

	app.post('/news', function (req, res) {
		var data = req.body;

		//导入商品类型查找模块
		require('../module/xy_sql.js')(res, data);
	});

	//获取图片
	app.post('/fileupload', upload.any(), function(req, res, next) {	
		res.append("Access-Control-Allow-Origin","*");
		//console.log(req.files);
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
		
		require('../module/upload.js')(res, result)
	})
};