var WebSocketServer = new require("ws").Server;
var http            = new require('http');
var express         = new require('express');
var config          = new require("./libs/config");
var players         = new require("./libs/clients");
var double          = new require("./libs/double");

var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;

app.set('port', port);
app.set('ipaddress', ipaddress);

var server = http.createServer(/*function(req, res) {
    console.log((new Date())+' request for ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Welcome to Node.js on OpenShift\n\n');
    res.end('Thanks for visiting');
}*/app);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('other event', function(data) {
        console.log(data);
    })
})

server.listen(app.get('port'), app.get('ipaddress'), function() {
    console.log('Express server listening on port ' + app.get('port'));
})

/*
wss = new WebSocketServer({
    server: server
    //port: 8080
});

console.log(wss);

wss.on('connection', function(ws) {
    players.newClient(ws);
})

console.log('Listening to '+ ipaddress + ':' + port + '...');

double.newGame();

server.listen(port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port '+ port);
});*/