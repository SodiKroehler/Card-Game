//constants
const http=require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const fs = require('fs');
const Game = require('./Game');
const Player = require('./Player');
const promptsList = require('./prompts.json');
const UUID = require('uuid');
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});
const port = 9000;
//const io=socketio(server);

//added for pre-React testing
//const clientPath = `${__dirname}/../client`;
//app.use(express.static(clientPath));
//variables

let rooms = [];

//on socket connection
io.on("connection", socket => {
  let player = new Player(socket.id);
  socket.emit("message", "New Connection Successful");
  socket.on("nickname", (nKname) => {
    player.setPlayerNickname(nKname);
  });

  socket.on("joinRoom", (rIdx) => {

    var foundTheRoom = false;
    for (i=0;i<rooms.length;i++){
      if (rooms[i].id === rIdx){
        rooms[i].addPlayer(player);
        foundTheRoom = true;
      }
    }
    if (!foundTheRoom){
      const newRoom = new Game(rIdx);
      newRoom.addPlayer(player);
      rooms.push(newRoom);
    }
    socket.join(rIdx);
    socket.emit("gameRoomNumber",rIdx);
  });

  socket.on("startRoom", () => {
    const newUUID = UUID.v4();
    roomNum = newUUID.toString().substring(0,6);
    socket.join(roomNum);
    const newRoom = new Game(roomNum);
    newRoom.addPlayer(player);
    rooms.push(newRoom);
    socket.emit("gameRoomNumber",roomNum);
  });

  socket.on("ready", () => {
    player.ready = true;
    const gameRoomSet = socket.rooms.keys();
    const tempVar = gameRoomSet.next();
    const currentGameRoom = gameRoomSet.next().value;
    for (i=0;i<rooms.length;i++){
      if (rooms[i].id === currentGameRoom){
        var everyonesReady = true;
        for(var plyr=0;plyr<rooms[i].playerCount;plyr++){
          if(rooms[i].playerDict[plyr].ready == false){
            everyonesReady = false;
          }
        }
        if(everyonesReady){
          rooms[i].startGame();
          for(var n=0;n<7;n++){
            let index = player.cardSet[n];
            var cardTuple = [];
            var bitmap = fs.readFileSync('./memes/' + index + '.gif');
            const data = new Buffer.from(bitmap).toString('base64');
            cardTuple = [index,data];
            socket.emit("card", cardTuple);
          }
          sendToRoom("message", currentGameRoom, "Choose the best card for this caption");
          sendToRoom("prompt", currentGameRoom, rooms[i].currentPrompt);
        }
      }
    }

  });

  socket.on("submission", (cardIdx) => {
    const gameRoomSet = socket.rooms.keys();
    const tempVar = gameRoomSet.next();
    const currentGameRoom = gameRoomSet.next().value;

    thisId = socket.id;
    for (i=0;i<rooms.length;i++){
      if (rooms[i].id === currentGameRoom){
        for (var p=0; p<rooms[i].playerDict.length;p++){
          const plyr = rooms[i].playerDict[p];
          console.log(plyr);
          if (plyr.id === thisId){
            for(let c=0;c<plyr.cardSet.length;c++){
              if(plyr.cardSet[c] === cardIdx){
                plyr.submissionIndex = c;
              }
            }
            console.log("just set" + plyr.submissionIndex);
          }
        rooms[i].submissions.push(cardIdx);
        if (Object.keys(rooms[i].submissions).length >= rooms[i].playerCount){


          for(var q=0;q<rooms[i].submissions.length;q++){
            const index = rooms[i].submissions[q];
            var bitmap = fs.readFileSync('./memes/' + index + '.gif');
            const data = new Buffer.from(bitmap).toString('base64');
            sendToRoom("modalCard", currentGameRoom, data);
          }
          sendToRoom("modal", currentGameRoom, rooms[i].submissions);
        }
      }
    }
  }
  });

  socket.on("vote", (love, hate) => {

    const gameRoomSet = socket.rooms.keys();
    const tempVar = gameRoomSet.next();
    const currentGameRoom = gameRoomSet.next().value;

    var winner;
    for (i=0; i<rooms.length; i++){
      if (rooms[i].id === currentGameRoom){
        rooms[i].manageVotes(love, hate);
        rooms[i].votes++;

        if (rooms[i].votes >= rooms[i].playerCount){
          const currentRoom = rooms[i];
          winner = currentRoom.findRoundWinner();
          sendToRoom("winner", currentGameRoom, winner);

          if (winner.score >=5) {
            currentRoom.endGame();
          } else {
            for(var m=0;m<rooms[i].playerCount;m++){
              var plyr = rooms[i].playerDict[m];
              if (plyr.id === socket.id){
                rooms[i].getReplacementCard(plyr);
                let index = plyr.cardSet[plyr.submissionIndex];
                console.log(plyr.submissionIndex);
                var bitmap = fs.readFileSync('./memes/' + index + '.gif');
                const data = new Buffer.from(bitmap).toString('base64');
                const cardTuple = [index,data];
                socket.emit("card",cardTuple);
              }
            }
            currentRoom.resetForNewRound();
            sendToRoom("message", currentGameRoom, "Next Round");
            sendToRoom("prompt", currentGameRoom, rooms[i].currentPrompt);
          }
        }


      }
    }
  });

  socket.on("disconnecting", () => {

    const gameRoomSet = socket.rooms.keys();
    const tempVar = gameRoomSet.next();
    const currentGameRoom = gameRoomSet.next().value;

    for (i=0;i<rooms.length;i++){
      if (rooms[i].id === currentGameRoom){
        rooms[i].removePlayer(player);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(socket.id + "left the game");
  });

});

function sendToRoom (type,rIdx,msg) {
  if (type === "winner"){
    const index = msg.cardSet[msg.submissionIndex];
    var bitmap = fs.readFileSync('./memes/' + index + '.gif');
    const data = new Buffer.from(bitmap).toString('base64');
    io.to(rIdx).emit(type,[msg.nickName, data, index]);
  }
  if (msg.length > 0){
    io.to(rIdx).emit(type, msg);
  }
}
server. on('error', (err)=>{
  console.error('Server error:', err);
});

server.listen(port, () => console.log("server running on port:" + port));
