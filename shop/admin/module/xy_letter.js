// 连接数据库
var connection = require('./connection')();

function getLetter(app){
    app.get('/email',function(req,res){
        res.append('Access-Control-Allow-Origin','*');
        connection.query(`select * from news where status=0`, function(error, results, fields) {
            if(error) throw error;
            // console.log('The solution is: ', results);
            res.send(results);
        });
    })
    
}

module.exports = getLetter;