var WebSocketServer = new require("ws").Server;
var http            = new require('http');
var config          = new require("./libs/config");
var players         = new require("./libs/clients");
var double          = new require("./libs/double");

var port = process.env.PORT || 8000;

const server = express()
      .use((req,res) => res.end('Hello :)'))
      .listen(port, () => console.log(`Listening on ${ port }`));

const wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
    players.newClient(ws);
})

console.log('Listening to ' + port + '...');

double.newGame();

server.listen(port);