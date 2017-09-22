/* 
 * @Author: 杨培钦
 * @Date:   2017-09-20 16:50:54
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-20 22:07:19
 */

var ioFunc = require('socket.io');

module.exports = function (server) {
	var io = ioFunc(server);
	io.on('connection', function (socket) {
		socket.on('chat', function (data) {
			console.log(data);
			io.emit('getMsg', data);
		})
	})
	console.log("已连接");
}