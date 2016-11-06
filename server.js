var config          = new require("./libs/config");
var players         = new require("./libs/clients");
var double          = new require("./libs/double");
var WebSocketServer = new require("ws");

var clients = {};
var lastNumbers = [];

var webSocketServer = new WebSocketServer.Server({
    port: 8000
});

webSocketServer.on('connection', function(ws) {
    console.log('newClient');
    players.newClient(ws);
})

double.newGame();

