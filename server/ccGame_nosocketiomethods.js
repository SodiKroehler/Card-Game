//playerDict.i=[0,sockdrawer[i],waitingPlayersList[i],[0,0,0,0,0,0,0]]
const usedCards=[];
const promptsList=[
  'apple',
  'banana',
  'girl',
  'girl',
  'girl',
  'girl',
  'girl',
  'girl',
  'girl',
  'girl',
  "I'm in this picture and I don't like it.",
  "Spawn Camping",
  "Really, this is just modern day racism.",
  "I don't think I've ever seen something so beautiful.",
  "The most frequent search on Google.",
];
var _playerDict={};

class ccGameRoom{

  constructor(clients){
    this._clients = clients;
    this._gamehasnotbewon='true';
    this._pickingPlayers=[];
    let playernumber=0;
    
    for (var nkName in this._clients){
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
    for (var player_number in this._playerDict) {
      if(player_number=== chooseridx){
        console.log("admitted "+ this._playerDict[player_number][1].nickname + "as the chooser");
        this._sendToPlayer(player_number, "You are the picker");

      }else{
        console.log( this._playerDict[player_number][1].nickname + "admitted to the voters");
        this._pickingPlayers.push(this._playerDict[player_number][1]);
        this._playerDict[player_number][1].emit('message', 'You are a voter');
      }
    };
    //send starting prompt to all players
    this._sendToPlayers('message','And the caption is...');
    this._sendPrompt();
    //assign new cards to players
    for (var kid in _playerDict){
      _playerDict[kid][2]=this._getcardset(_playerDict[kid][2]);
      th

    }
    //select card instruction emitted
    this._sendToPickingPlayers("Click on your submission whenever you feel like it.");
    this._sendToPlayer(chooseridx,"Wait a fucking minute for the rest of the guys.");
    //set up activity for listners of choosers
    let _submissions=[];
    for (var sock in this._clients){

      this._clients[sock].on('cardselection',(card)=>{
        _submissions.push(card);
        usedCards.push(card);
        for (var sidx in _playerDict){
          console.log(_playerDict[sidx]);
          _playerDict[sidx][2].splice((_playerDict[sidx][2].indexOf(card)),1);
          this._getcardset(_playerDict[sidx][2]);
        }
      });
    }
    //send waiting for players message to choosers
    this._sendToPlayer(chooseridx,'Sorry, still waiting on those dicks.');
    //send the submissions
    if (_submissions.length==3){
      this._sendToPlayers('modal', submissions)
      };

    //get back results from chooser
    let _chooserNickname=_playerDict[chooseridx][1];
    this._clients[_chooserNickname].on('modal',((winnercard)=>{
      for(var i=0;i<Object.keys(_playerDict).length;i++){
        if (winnercard in _playerDict[i][2]){
            this._sendToPlayers('message',(_playerDict[i][1].value)+'is the winner of this round')
            _playerDict[i][0]++;
        }
      }
    }));
  }



_sendToPlayer(playerIndex,msg) {
  for(var playersock in this._clients){
    if(_playerDict[playerIndex]){
    if (playersock==_playerDict[playerIndex][1]){
      this._clients[playersock].emit('message', msg);
    }
  }else{
    console.log('could not find that person')
  }
  }
}
  _sendToPlayers(type, msg){
    for(var playersock in this._clients){
      this._clients[playersock].emit(type, msg);
    }
  }
  _sendToPickingPlayers(msg){
    this._pickingPlayers.forEach((player) => {
        player.emit('message', msg);
    });
  }
  _sendPrompt(){
    const promptIndex=Math.random(0,10);
      this._sendToPlayers('prompt',promptsList[10]);
      console.log(promptsList[10]);
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
      let cardindex=Math.random(1,7);
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
