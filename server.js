var config          = new require("./libs/config");
var players         = new require("./libs/clients");
var double          = new require("./libs/double");
var WebSocketServer = new require("ws");

var clients = {};
var lastNumbers = [];

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var webSocketServer = new WebSocketServer.Server({
    port: 8000
});

webSocketServer.on('connection', function(ws) {
    console.log('newClient');
    players.newClient(ws);
})

console.log('Listening to '+ ipaddress + ':' + port + '...');

double.newGame();

