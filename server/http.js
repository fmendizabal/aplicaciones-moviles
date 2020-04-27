const http = require('http');

const hostname = '127.0.0.1';
var port = process.env.PORT || 3000;

const server = http.createServer(
	(req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Hola Mundo');
	}
);

server.listen(port,
	() => {
		console.log('listening on port: ', port);
	}
);

