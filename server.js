var WebSocketServer = new require("ws");
var http            = new require('http');
var config          = new require("./libs/config");
var players         = new require("./libs/clients");
var double          = new require("./libs/double");

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server = http.createServer(function(req, res) {
    console.log((new Date())+' request for ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Welcome to Node.js on OpenShift');
    res.end('Thanks');
});

server.listen(port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port '+ port);
});

var wss = new WebSocketServer.Server({
    server: server
    //port: 8080
});

wss.on('connection', function(ws) {
    console.log('newClient');
    players.newClient(ws);
})

console.log('Listening to '+ ipaddress + ':' + port + '...');

double.newGame();

