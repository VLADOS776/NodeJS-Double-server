var WebSocketServer = new require("ws");
var double          = new require("./double");
var config          = new require("./config");

var clients = {};

function newClient(ws) {
    var id = Math.random();
    clients[id] = ws;
    
    var firstConnect = {
        server: true,
        type: 'first-connect',
        id: id,
        lastGames: double.lastNumbers(),
        rollTime: double.getNextRoll(),
        rolling: double.status(),
        bets: double.bets()
    }
    ws.send(JSON.stringify(firstConnect));
    
    console.log("New connection: "+id);
    
    onlineChanged();
    
    ws.on('message', function(message){
        newMessage(message)
    });
    ws.on('close', function(){
        close(id)
    });
};
    
function newMessage(message) {
    console.log(message);
    var message = JSON.parse(message);
    
    if (message.type == 'bet')
        double.newBet(message);
    
    sendToAll(message);
};
    
function close(id) {
    console.log('Connection closed: ' + id);
    delete clients[id];
    onlineChanged();
};

function onlineChanged() {
    var msg = {
        server: true,
        type: 'online',
        online: Object.keys(clients).length
    }
    sendToAll(msg);
}

function sendToAll(msg) {
    msg = JSON.stringify(msg);
    for (var key in clients) {
        clients[key].send(msg);
    }
}

module.exports.newClient = newClient;
module.exports.sendToAll = sendToAll;