/* 
 * @Author: 杨培钦
 * @Date:   2017-09-20 16:50:54
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-23 16:35:31
 */

var ioFunc = require('socket.io');
var connection = require('./connection')();

module.exports = function (server) {
	var io = ioFunc(server);
	io.on('connection', function (socket) {
		socket.on('chat', function (data) {
            connection.query(`insert into news (message,status) values ("${data}","0")`, function(error, results, fields) {
                if(error) throw error;
                // console.log('The solution is: ', results);    
            });
			io.emit('getMsg', data);
		})
	})
	console.log("已连接");
}