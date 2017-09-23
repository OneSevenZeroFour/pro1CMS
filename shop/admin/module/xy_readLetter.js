// 连接数据库
var connection = require('./connection')();

function readLetter(app){
    app.get('/read',function(req,res){
        res.append('Access-Control-Allow-Origin','*');
        // console.log(req.url);
        var id = req.url.split('=')[1]*1;
        // console.log(id);
        connection.query(`update news set status=1 where id=${id}`, function(error, results, fields) {
            if(error) throw error;
            // console.log('The solution is: ', results);
            res.send(results);
        });
    })
    
}

module.exports = readLetter;