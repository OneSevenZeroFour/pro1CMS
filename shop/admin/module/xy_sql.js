/* 
* @Author: 杨培钦
* @Date:   2017-09-21 11:32:28
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-21 16:15:55
*/

var connection = require('./connection')();

module.exports = function(res, data){
	res.append("Access-Control-Allow-Origin","*");
	var msg = (data.split('='))[1];
	msg = decodeURI(msg);
	console.log(msg);

	//connection.connect();
	connection.query(`insert into news (message) values ("${msg}")`, function(error, results, fields) {
		if(error) throw error;
		console.log('The solution is: ', results);    
	});
	//connection.end();
}
// var app = express();
/*
var http = require("http");
var url = require('url');
var querystring = require('querystring');
// var express = require('express');
var mysql = require("mysql");
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'first_project'
});
connection.connect();
*/
/*
http.createServer(function(req,res){
    var data = '';
    req.on('data',function(chunk){
        data += chunk;
    });
    res.setHeader("Access-Control-Allow-Origin","*");
    req.on('end',function(){
        console.log(data);
        var msg = (data.split('='))[1];
        msg = decodeURI(msg);
        console.log(msg);

        connection.query(`insert into news (message) values ("${msg}")`, function(error, results, fields) {
            if(error) throw error;
            console.log('The solution is: ', results);    
        });
    })
}).listen(1234);

// connection.query('SELECT * FROM news',function(error, results, fields){
//     if(error) throw error;
//     console.log('The solution is: ', results);
// });

// app.listen(1234);
console.log("已连接");
*/