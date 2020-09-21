const http=require("http");
const express=require('express');
const socketio = require('socket.io');

const ccGame = require('./ccGame.js');

const app=express();

const clientPath = `${__dirname}/../client`;
//console.log("serving static from${clientPath}");

app.use(express.static(clientPath));


const server = http.createServer(app);
let clients={};
const io=socketio(server);
let roomnum=0;
io.on('connection', (sock) =>{
    sock.emit('message',"Bonjour");
    sock.join('room'+roomnum);
    sock.on('namentry',(NKname) => {
      sock.nickname=NKname;
      clients[NKname]=sock;
      clients[NKname].emit('message', 'Ready to rock');
      let _numberwaiting= 4-Object.keys(clients).length;
      io.sockets.in('room'+roomnum).emit('message', NKname + ' joined, Waiting for '+_numberwaiting+' other parties');
      if (Object.keys(clients).length>3) {
        processnewroom(clients);
        clients={};
        roomnum++;
      };
    });
    sock.on('disconnect', function (data) {
        delete clients[sock.nickname];
        io.sockets.in('room'+roomnum).emit('message', sock.nickname+ 'left :(');
    });

  });


function processnewroom(clients){
  for (var sock in clients){
    clients[sock].emit('message','Game is starting!')
  }
  new ccGame(clients);
}

server. on('error', (err)=>{
  console.error('Server error:', err);
});
server.listen(8080,()=>{
  console.log('PRS started on 8080');
});
