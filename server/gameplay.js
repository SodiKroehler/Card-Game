class Game{

  constructor(p1,p2,BigD){
    this._players=[p1,p2];
    this._turns =[null,null];

    this._sendToPlayers('Game is starting!!');
    //populate dict with sample values before insting new game
    //emit prompt to all players
    //emit new cards to all players
    //emit instruction select a card
    //set up listener for turn, for each turn, store returned number if not chooser, and minusfrom list of cards
    //else, send waiting for players
    //when list of turns ==3, send list to chooser as a submissions
    //set up listener for submissions, _sendToPlayers number returned
    //change count of wins on player dict
    //check for win, and if not, recall function
    this._players.forEach((player,idx) => {
      player.on('turn', (turn) => {
        this._onTurn(idx,turn);
      });
    });
/*
;*/
  }
_sendToPlayer(playerIndex,msg){
  this._players[playerIndex].emit('message', msg);
}
  _sendToPlayers(msg){
    this._players.forEach((player) => {
      player.emit('message', msg);
    });
  }

  _onTurn(playerIndex,turn){
    this._turns[playerIndex]=turn;
    this._sendToPlayer(playerIndex,'played'+ turn);
  }
  _checkGameOver(){
    const turns=this._turns;

    if (turns[0] && turns[1]){
      this._sendToPlayers('Game over' + turns.join(' : '));
      this._turns =[null,null];
      this._sendToPlayers('Next Round!');

    }
  }
}

module.exports = RpsGame;
