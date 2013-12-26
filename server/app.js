
var express = require('express');
var server = express();

var fs = require('fs');



server.get('/products', function(req, res){
	var data = fs.readFileSync('data.json', 'utf-8');
	console.log('load data ', data);
	res.setHeader('Content-Type', 'application/json');
	res.send(data);
});

server.listen(3000);
console.log('Start HTTP Server(listen on 3000 port');