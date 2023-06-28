//node_modules
const http=require("http");
const express = require("express");
const socketio = require('socket.io');
const fs = require('fs');
//const morgan = require('morgan');

//custom modules
const Game = require('./my_modules/Game');
const Player = require('./my_modules/Player');
const THESEUS = require('./my_modules/THESEUS');
//const promptsList = require('./prompts.json');

//setup
const app = express();
const server = http.createServer(app);
const UUID = require('uuid');
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});
const rooms = new Object();
const PORT = 4000;

// app.get('/', (req, res) => {
//   THESEUS.initDB().then(()=> {
//   }).catch((error) => {console.log(error)});
//   THESEUS.find_user("tadashihamada@gmail.com").then((tabledata) => {
//     res.send(tabledata);
//     console.log(tabledata);
//   }).catch((error) => {console.log("error" + error)});
// })

//on socket connection
io.on("connection", socket => {
  let player = new Player(socket.id);
  socket.emit("debug", "New Connection Successful");

  //email lookup
  // socket.on("email", (player_email) =>{
  //   THESEUS.findPlayer(player_email).then((info) => {
  //     if (info != null){
  //       player.loadPlayer(info);
  //       socket.emit("open", {"type":"login", "data": [player.getRiddle(), player.getUserName()]});
  //     } else {
  //       socket.emit("open", {"type":"registration", "data": []});
  //     }
  //   }).catch((error) => {console.log("error " + error)});
  // })
  
  socket.on("registration", (info) => {
    //info must be the same as mysql result
    player.loadPlayer(info);
  });

  socket.on("login", (ridAnswer) => {
    player.authenticate(ridAnswer);
  });

  socket.on("nickname", (nickname) => {
    player.nickname = nickname;
  });
  // socket.on("joinRoom", (roomId) => {
  //   //promise functionality for future room db (?)
  //   THESEUS.findRoom(player_email).then((room) => {
  //     if (room != null){
  //       room.addPlayer(player); 
  //     } else {
  //       const newRoom = new Game(roomId);
  //       newRoom.addPlayer(player);
  //       THESEUS.addRoom(newRoom);
  //     }
  //   }).catch((error) => {console.log("error " + error)});
  // });

  //   socket.join(rIdx);
  //   socket.emit("gameRoomNumber",rIdx);
  // });

  socket.on("startRoom", (roomNum) => {
    if (roomNum == ""){
      const newUUID = UUID.v4();
      roomNum = newUUID.toString().substring(0,6);
    }

    socket.join(roomNum);
    const newRoom = new Game(roomNum);
    newRoom.addPlayer(player);
    rooms[roomNum] = newRoom;
    socket.emit("roomCreationSuccess", roomNum);
  });

  socket.on("ready", () => {
    const currentGameRoom = getRoomFromSocket(socket.rooms.keys());
    currentGameRoom.getPlayer(socket.id).setPlayerReady();
    var everyonesReady = currentGameRoom.everyoneIsReady();
    if(everyonesReady){
      currentGameRoom.startGame();
      for(var n=0;n<7;n++){
        let cardName = player.cardSet[n];
        var cardTuple = [];
        cardTuple = [n, cardName, getGifFromCardName(cardName)];
        socket.emit("card", cardTuple);
      }
      sendToRoom("message", currentGameRoom, "choose the best chit");
      sendToRoom("prompt", currentGameRoom, currentGameRoom.currentPrompt);
    }
  });

  socket.on("switchCard", ([cardName, cardId, reason]) => {
    const currentGameRoom = getRoomFromSocket(socket.rooms.keys());
    var player = currentGameRoom.getPlayer(socket.id);
    var replacedCardTuple = currentGameRoom.getReplacementCard(player, cardId);
    replacedCardTuple[2] = getGifFromCardName(replacedCardTuple[1]);
    socket.emit("card", replacedCardTuple);
  });

  socket.on("submission", ([cardName, cardPosition]) => {

    var currentGameRoom = getRoomFromSocket(socket.rooms.keys());
    var player = currentGameRoom.getPlayer(socket.id);

    currentGameRoom.addSubmission(player.socketId, cardName, cardPosition);

    if (currentGameRoom.submissions.length >= currentGameRoom.numPlayers){
      //time to rate submissions
      for (let sub in currentGameRoom.submissions){
        var cardName = currentGameRoom.submissions[sub][1];
        var subArray = [getGifFromCardName(cardName), cardName, player.socketId, player.nickname];
        sendToRoom("submissionCard", currentGameRoom, subArray);
      }
      //send a blank so all clients know to show completed
      sendToRoom("serverMessage", currentGameRoom, "endOfSubmissions");
    }
  });

  socket.on("vote", (guesses) => {

    const currentGameRoom = getRoomFromSocket(socket.rooms.keys());
    var player = currentGameRoom.getPlayer(socket.id);

    currentGameRoom.tallyVote(guesses);
    
    if (currentGameRoom.votes >= currentGameRoom.numPlayers){
      currentGameRoom.completeRound(isWinner = (winnerNickname) => {
        socket.emit("winner", winnerNickname);
      });
    }

    for (let p=0; p<currentGameRoom.numPlayers; p++){
      //send everyone their new scores
      io.to(currentGameRoom.playerDict[p].socketId).emit('scoreUpdate', currentGameRoom.playerDict[p].score);

    }

    currentGameRoom.resetForNewRound();
    sendToRoom("serverMessage", currentGameRoom, "newRound");
  });

  // socket.on("preview", (cardName) => {
  //   //kept the same format, just for simplicty
  //   //did not put in the functionality to get the cardPos, although that should be easy
  //   var retValue = [0, cardName, getVideoFromCardName(cardName)];
  //   socket.emit("preview", retValue)
  // });

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

function getRoomFromSocket(keys){
  const ownRoom = keys.next();
  const roomID = keys.next().value
  return rooms[roomID];
}

function sendToRoom (type,rIdx,msg) {
  io.to(rIdx.id).emit(type, msg);
}

function getGifFromCardName(cardName){
  var bitmap = fs.readFileSync('./../../assets/gifs/' + cardName + '.gif');
  const data = new Buffer.from(bitmap).toString('base64');
  return data;
}

// function getVideoFromCardName(cardName){
//   var data = fs.readFileSync('./../../assets/videos/02_HAND.mp4');
//   // var data = fs.readFileSync('./../../assets/memes/video/' + cardName + '.mp4');
//   // const data = new Buffer.from(bitmap).toString('base64');
//   return data;
// }

server.on('error', (err)=>{
  console.error('Server error:', err);
});

server.listen(PORT, () => console.log("server running on port:" + PORT));
