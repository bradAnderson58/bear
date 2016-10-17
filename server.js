// require imports http module
var http = require('http');

// define port
const PORT = 8080;

// TODO: requests
function handleRequest(req, resp) {
	resp.end('yay todo');
}

// create server
var server = http.createServer(handleRequest);

server.listen(PORT, function() {
	console.log('server listening on localhost');
});