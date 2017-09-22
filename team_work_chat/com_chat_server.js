var WSServer = require('ws').Server;
var wss = new WSServer({port:414});

var userOnlineNames = [];
wss.on('connection',function(socket,req){
    socket.on('message',function(data){
        var obj = JSON.parse(data);
        switch(obj.type){
            case 'others':
                wss.clients.forEach(function(client){
                    if(client!==socket){//排除自身
                        client.send(JSON.stringify(obj));
                    }
                });
                break;
            case 'login':
                userOnlineNames.push(obj.text);
                obj.onlineNames = userOnlineNames;
                wss.clients.forEach(function(client){
                    client.send(JSON.stringify(obj));
                });
                break;
            case 'loginOut':
                userOnlineNames.splice(userOnlineNames.indexOf(obj.text),1);
                obj.onlineNames = userOnlineNames;
                wss.clients.forEach(function(client){
                    client.send(JSON.stringify(obj));
                });
                break;
        }
    });
});

console.log('statrServer',414);