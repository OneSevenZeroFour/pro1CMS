module.exports = function router(app,mysql) {
	//设置路由

	app.get('/page', function(req, res) {
		var data = req.query;
		//导入配置连接
		var connection = require('../module/connection.js')(mysql);
		//导入分页模块
		require('../module/page.js')(connection, res, mysql, data);
	});

	app.get('/addgoods', function(req, res) {
		var data = req.query;
		//导入配置连接
		var connection = require('../module/connection.js')(mysql);
		//	//导入添加模块
		require('../module/addGoods.js')(connection, res, mysql, data);
	});

	app.get('/removegoods', function(req, res) {
		var data = req.query;
		//导入配置连接
		var connection = require('../module/connection.js')(mysql);
		//导入删除模块
		require('../module/removegoods.js')(connection, res, mysql, data);
	});

	app.get('/gaingoods', function(req, res) {
		var data = req.query;
		//导入配置连接
		var connection = require('../module/connection.js')(mysql);
		//导入ID获取信息模块
		require('../module/gaingoods.js')(connection, res, mysql, data);
	});

	app.get('/amendgoods', function(req, res) {
		var data = req.query;
		//导入配置连接
		var connection = require('../module/connection.js')(mysql);
		//导入修改模块
		require('../module/amendgoods.js')(connection, res, mysql, data);
	});

	app.get('/goodsType', function(req, res) {
		//导入配置连接
		var connection = require('../module/connection.js')(mysql);
		//导入商品类型数量查找模块
		require('../module/goodsType.js')(connection, res, mysql);
	});

	app.get('/typeFind', function(req, res) {
		var data = req.query;
		//导入配置连接
		var connection = require('../module/connection.js')(mysql);
		//导入商品类型查找模块
		require('../module/typeFind.js')(connection, res, mysql, data);
	});

	app.get('/mhsearch', function(req, res) {
		var data = req.query;
		//导入配置连接
		var connection = require('../module/connection.js')(mysql);
		//导入商品类型查找模块
		require('../module/mhsearch.js')(connection, res, mysql, data);
	});
};