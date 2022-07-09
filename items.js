// var http = require('http');

// http.createServer(function (req, res) {
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.end('Hello World!');
// }).listen(8080);

function sayHi(name) {
	console.log('Hi '+name);
}

function sayHello(name) {
	console.log('Hello '+name);
}

module.exports = {
	sayHi, sayHello
};