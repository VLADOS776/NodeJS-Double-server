var config  = new require("./config");
var players = new require("./clients");

var numbers = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8];

var nextRollTime = Date.now() + config.rollTime;

var lastNumbers = [0],
    gamestart = false,
    bets = [];

function newGame() {
    gamestart = false;
    nextRollTime = Date.now() + config.rollTime
    bets = [];
    
    console.log('Double: New game.');
    
    players.sendToAll({
        server: true,
        type: 'new-game',
        lastNumber: lastNumbers[0]
    });
    
    setTimeout(function(){
        startGame();
    }, config.rollTime)
}

function startGame() {
    gamestart = true;
    var winNum = Math.rand(0, 14);
    console.log('Double: Start game. Win number: '+winNum);
    
    lastNumbers = [winNum].concat(lastNumbers);
    if (lastNumbers.length > config.lastGameCount)
        lastNumbers.splice(-1);
    
    players.sendToAll({
        server: true,
        type: 'win-number',
        number: winNum
    });
    nextRollTime = Date.now() + config.pauseBeforeNewGame;
    
    setTimeout(function() {
        newGame();
    }, config.pauseBeforeNewGame);
}

function newBet(bet) {
    bets.push(bet);
}

function getBets() {
    return bets;
}

function getNextRoll() {
    return nextRollTime - Date.now();
}

function getLastNumbers() {
    return lastNumbers;
}

function getStatus() {
    return gamestart;
}

Math.rand = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.newGame = newGame;
module.exports.newBet = newBet;
module.exports.lastNumbers = getLastNumbers;
module.exports.getNextRoll = getNextRoll;
module.exports.bets = getBets;
module.exports.status = getStatus;