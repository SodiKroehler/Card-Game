
console.log("We're loaded");
const http=require("http");

const express=require('express');
const socketio = require('socket.io');

const app=express();

const clientPath = `${__dirname}/../client`;
//console.log("serving static from${clientPath}");

app.use(express.static(clientPath));

const server = http.createServer(app);

const io=socketio(server);
const playersD={};
let playerDidx = 0;
let waitingPlayers=0;
let nicknames=[];
let sockdrawer=[];
let roomnum=0;
let clients=[];

io.on('connection', (sock) =>{
  sock.on('namentry',function (name){
    sock.nickname = name;
    nicknames.push(name);
    waitingPlayers++;
    sock.join(roomnum);
    clients.push(sock);
    let _numberwaiting= 4-waitingPlayers;
    io.sockets.in(roomnum).emit('message', sock.nickname + ' joined, Waiting for '+_numberwaiting+' other parties');

    if(io.nsps['/'].adapter.rooms[roomnum] && io.nsps['/'].adapter.rooms[roomnum].length == 4) {
      waitingPlayers=0;
      startnewgame(roomnum);
      roomnum++;


    };
  sock.on('message', (text) =>{
    io.emit('message', text);
  });
});

});
const usedCards=[];
const promptsList=require('./prompts');
var _playerDict= {};


function startnewgame(room){
  const _gamehasnotbewon='true';
    const _clientIDS=[];
    let playernumber='0';
    const clients_in_room =io.sockets.adapter.rooms[room];
    for (var sock in clients_in_room){
      _playerDict.playernumber=[0,sock,sock.nickname,[0,0,0,0,0,0,0]];
      playernumber++;
    };
    const chooseridx=0;
    while(this._gamehasnotbewon==='true'){
      _playccGame(chooseridx);
        if (chooseridx<4){
          chooseridx++;
        }else{
          chooseridx=0;
        };
        for(i=0;i<playerDict.length;i++){
          if (_playerDict[i][0]==5){
            _gamehasnotbewon='false';
            io.sockets.in(room).emit('message', "Winner is" + playerDict[i][2])
            break;
          }
        }
      }
    }

  _playccGame(chooseridx){
    let _pickingPlayers=[];
    clients.forEach((sock, i) => {
      if(i != chooseridx){
        _pickingPlayers.push(sock);
      }else{
        _sendToPlayer(chooseridx, "You are the picker")
      }
      i++;
    });
    //send starting prompt to all players
    _sendToPlayers('Lets goooooooo!!!!');
    _sendPrompt();
    //assign new cards to players
    for (var kid in _playerDict){
      console.log(kid);
      kid[2]=this._getcardset(kid[2]);

    }
    //select card instruction emitted
    _sendToPickingPlayers("Click on your submission whenever you feel like it.");
    _sendToPlayer(chooseridx,"Wait a fucking minute for the rest of the guys.");
    //set up activity for listners of choosers
    let _submissions=[];
    let sidx=0;
    sock.on('cardselection',(card)=>{
        _submissions.push(card);
        for (var kid in _playerDict){
          if kid[2]==sock.nickname;
          sidx=kid;
        }
        _playerDict[sidx][3].splice((_playerDict[sidx][3].indexOf(card)),1);
        usedCards.push(card);
        this._getcardset(_playerDict[sidx][3]);
      })
    //send waiting for players message to choosers
    _playerDict[chooseridx][1].emit('message','Sorry, still waiting on those dicks.');
    //send the submissions
    if (submissions.length==3){
      this._clients.forEach((sock, i) => {
        sock.emit('modal',submissions);
        i++;
      });

    }
    //get back results from chooser
    clients[chooseridx].on('modal',((winnercard)=>{
      for(i=0;i<playerDict.length;i++){
        if (winnercard in _playerDict[i][3]){
            _sendToPlayers((_playerDict[i][2].value)+'is the winner of this round')
            _playerDict[i][0]++;
        }
    }
  }));
}



_sendToPlayer(playerIndex,msg) {
  for(var client in clients){
    if(_playerDict[playerIndex]){
    if (client.nickname==_playerDict[playerIndex][2]){
      client.emit('message', msg);
    }
    }else{
    console.log('could not find that person')
    }
  }
}
  _sendToPlayers(msg){
    const clients_in_room =io.sockets.adapter.rooms[room]
    this._clients.emit('message', msg);
  }
  _sendToPickingPlayers(msg){
    this._pickingPlayers.forEach((player) => {
        player.emit('message', msg);
    });
  }
  _sendPrompt(){
    const promptIndex=Math.random(0,10);
    this._clients.forEach((player, i) => {
      player.emit('prompt',promptsList[promptIndex])
      i++;
    });
    }
_getcardset(userscards){
  let newcardlist=userscards;
  for(var i=0;i<userscards.length;i++){
    if(userscards[i]==='0'){
      userscards.splice(userscards.indexOf(card),1);
    };

  }
  //need to add something here to keep card 0s from passing through
  while ((userscards.length)<6){
    let cardindex=Math.random(1,7);
    if (cardindex in usedCards === false){
      newcardlist+=cardindex;
      usedCards+=cardindex;
      }
      return newcardlist;
    }
  }
}

server. on('error', (err)=>{
  console.error('Server error:', err);
});
server.listen(8080,()=>{
  console.log('PRS started on 8080');
});
