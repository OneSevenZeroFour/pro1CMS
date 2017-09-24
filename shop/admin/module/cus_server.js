// //创建服务器
// var server = require('http').createServer();
//创建io实例
var connection = require('./connection')();
var ioFun = require('socket.io');

module.exports = function(server){
    var io = ioFun(server);

    //创建后台客服对象和前端客服对象列表
    var serverPerson = null,clientPersons = [];//{name,id}  [{name,id}]
    var visitorId = 1;//用于区分游客
    //监听客户端连接，并在其中完成主要逻辑代码【中转站】
    io.on('connection',function(socket){
        //监听前端客服事件，并触发事件给后台客服
        socket.on('clientLogin',function(name){
            var id = socket.id;
            if(name==='youke'){
                name = '游客000'+visitorId;//中文乱码
                visitorId++;
            }
            clientPerson = {id,name};
            clientPersons.push(clientPerson);
            io.emit('clientLoginS',clientPerson);
        });
        socket.on('sendToServer',function(text){
            var name = '';
            var id = socket.id;
            clientPersons.map(function(item){
                if(item.id==socket.id){name = item.name;return;};
            });
            io.emit('sendToServerS',{id,name,text});
        });
        // socket.on('clientLeave',function(){});

        //监听后台客服事件，并触发事件给前端客服
        socket.on('serverLogin',function(name){
            serverPerson = {id:socket.id,name};
            // io.emit('clientLogin');
        });
        socket.on('sendToClient',function(obj){//obj:{text,id}
            io.sockets.sockets[obj.id].emit('sendToClient',{personName:serverPerson.name,text:obj.text});
        });
        // socket.on('serverLeave',function(){});
        

        //留言
        socket.on('chat', function (data) {
            connection.query(`insert into news (message,status) values ("${data}","0")`, function(error, results, fields) {
                if(error) throw error;
                // console.log('The solution is: ', results);    
            });
            io.emit('getMsg', data);
        })
    });
}
//监听端口
// server.listen(4144);
// console.log('startServer',4144);