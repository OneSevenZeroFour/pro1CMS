//引用模块
var express = require('express');
var mysql = require('mysql');

//创建框架
var app = express();
//var router = express.Router();

//设置静态文件夹
app.use(express.static('../static'));

//引用路由
require('../module/router.js')(app,mysql);

//创建服务器
app.listen(8888);
console.log('Server running at http://127.0.0.1:8888/');