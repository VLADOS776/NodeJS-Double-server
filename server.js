var WebSocketServer = new require("ws").Server;
var http            = new require('http');
var config          = new require("./libs/config");
var players         = new require("./libs/clients");
var double          = new require("./libs/double");

var port = 8000;

var server = http.createServer(function(req, res) {
    console.log((new Date())+' request for ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Welcome to Node.js on OpenShift\n\n');
    res.end('Thanks for visiting');
});

wss = new WebSocketServer({
    server: server
    //port: 8080
});

//console.log(wss);

wss.on('connection', function(ws) {
    players.newClient(ws);
})

console.log('Listening to ' + port + '...');

double.newGame();

server.listen(port);