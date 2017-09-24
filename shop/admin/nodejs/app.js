//引用模块
var express = require('express');

var path = require('path');
//创建框架
var app = express();

var http = require('http');
    
var server = http.createServer(app);
//var router = express.Router();

//设置静态文件夹
app.use(express.static(path.join(__dirname,'../')));
app.use(express.static('../../font/src/img'));

//引用路由
require('../module/router.js')(app);
// require('../module/xy_socket.js')(server);
require('../module/cus_server.js')(server);
require('../module/xy_letter.js')(app);
require('../module/xy_readLetter.js')(app);

//创建服务器
server.listen(8888);

console.log('Server running at http://127.0.0.1:8888/');