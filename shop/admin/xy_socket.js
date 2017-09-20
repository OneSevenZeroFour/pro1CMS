/* 
* @Author: 杨培钦
* @Date:   2017-09-20 16:50:54
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 20:41:00
*/

var http = require('http');
var ioFunc = require('socket.io');
var server = http.createServer();
var io = ioFunc(server);
server.listen(3000);

io.on('connection',function(socket){
    socket.on('chat',function(data){
        console.log(data);
        io.emit('getMsg',data);
    })
})

console.log("已连接");