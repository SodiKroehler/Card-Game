//playerDict.i=[0,sockdrawer[i],waitingPlayersList[i],[0,0,0,0,0,0,0]]
const fs = require('fs');

fs.readFile('prompts1.json', (err, data) => {
    if (err) throw err;
    promptsList = JSON.parse(data);
});

const usedCards=[];

var _playerDict={};

class ccGameRoom{

  constructor(clients){
    this._clients = clients;
    this._gamehasnotbewon='true';
    this._pickingPlayers=[];
    let playernumber=0;
    for (var nkName in this._clients){
      this._clients[nkName].playerID=playernumber;
      _playerDict[playernumber]=[0,nkName,[0,0,0,0,0,0,0]];
      playernumber++;
    };
    if (this._gamehasnotbewon==='true'){
        let chooseridx=0;
        this._playccGame(chooseridx);
        if (chooseridx<4){
          chooseridx++;
        }else{
          chooseridx=0;
        };
        for (var i=0;i<Object.keys(_playerDict).length;i++){
          if (_playerDict[i][0]==5){
            this._gamehasnotbewon='false';
            this._sendToPlayers('message', "Winner is" + playerDict[i][1])
            break;
          }
        }
      }
    }


  _playccGame(chooseridx){
    for (var player_number in _playerDict){
      if(player_number==chooseridx){
        console.log("admitted "+ _playerDict[player_number][1] + " as the chooser");
        this._sendToPlayer(player_number, "You are the picker");

      }else{
        console.log(_playerDict[player_number][1]+ " admitted to the voters");
        this._pickingPlayers.push(player_number);
        this._sendToPlayer(player_number, "You are a voter");
      }
    };
    //send starting prompt to all players
    this._sendToPlayers('message','And the caption is...');
    this._sendPrompt();
    //assign new cards to players
    for (var kid in _playerDict){
      _playerDict[kid][2]=this._getcardset(_playerDict[kid][2]);

    }
    //select card instruction emitted
    this._sendToPickingPlayers("Click on your submission whenever you feel like it.");
    this._sendToPlayer(chooseridx,"Wait a fucking minute for the rest of the guys.");
    //set up activity for listners of choosers
    let _submissions=[];
    for (var sock in this._clients){
      //get image files and put in card list
      var cardlistfrmplayerDict = _playerDict[this._clients[sock].playerID][2];
      for (var c in cardlistfrmplayerDict){
        var cardbase64address;
          fs.readFile(__dirname + '/memes/2.gif', function(err, buf){
            if (err){
              console.log(err)
            }
            else if(buf){
              cardbase64address=buf;
            }})
            for(var i=0;i<10000;i++){
              if (cardbase64address){
                this._clients[sock].emit('card', {image: true, buffer: cardbase64address.toString('base64'), num: c});
              }
            }


      }
      //send current card list to each player

      this._clients[sock].on('cardselection',(card)=>{
        _submissions.push(card);
        usedCards.push(card);
        _playerDict[this._clients[sock].playerID][2].splice((_playerDict[this._clients[sock].playerID][2].indexOf(card)),1);
        this._getcardset(_playerDict[this._clients[sock].playerID][2]);
      });
    }
    //send waiting for players message to choosers
    this._sendToPlayer(chooseridx,'Sorry, still waiting on those dicks.');
    //send the submissions
    if (_submissions.length==3){
      this._sendToPlayers('modal', submissions)
      };

    //get back results from chooser
    for (var sock in this._clients){
      if (this._clients[sock].playerID==chooseridx){
        this._clients[sock].on('modal',((winnercard)=>{
          for (var p in _playerDict){
            if (winnercard in _playerDict[p][2]){
                this._sendToPlayers('message',_playerDict[p][1]+'is the winner of this round')
                _playerDict[p][0]++;
            }
          }
        }));
      }
    }

}

_sendToPlayer(playerIndex,msg){
  for(var playersock in this._clients){
    if(this._clients[playersock].playerID == playerIndex){
      this._clients[playersock].emit('message', msg);
    }
  }
}
  _sendToPlayers(type, msg){
    for(var playersock in this._clients){
      this._clients[playersock].emit(type, msg);
    }
  }
  _sendToPickingPlayers(msg){
    for (var sock in this._clients){
      if (this._clients[sock].playerID in this._pickingPlayers){
        this._clients[sock].emit('message', msg);
      }
    }
  }

  _sendPrompt(){
    const promptIndex=Math.floor(Math.random() * 4)
    //get off my back about the stupid names, I'm lonely and wish i had a girlfriend so go fuck yourself
    //with ur tiny little millipede dick.
      this._sendToPlayers('prompt',promptsList[promptIndex]);
    }
_getcardset(userscards){
  if(userscards){
    let newcardlist=userscards;
    for(var i=0;i<newcardlist.length;i++){
      if(userscards[i]==='0'){
        userscards.splice(userscards.indexOf(card),1);
      };
    }
    if ((userscards.length)<6){
      let cardindex=Math.floor(Math.random() * 4);
      if (cardindex in usedCards === false){
        newcardlist+=cardindex;
        }
      }else{
        return newcardlist;
      }
  }
}
}


module.exports = ccGameRoom;
