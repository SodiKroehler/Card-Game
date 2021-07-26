class playerDictionary {

    constructor(gameId) {
        this.gameId = gameId;
        this.chooser= 0;
        this.usedCards =[];
        this.clients = {};
    }

    addClient(socket){
      let cardSet = newCardSet();
      this.clients[socket.playerNumber] = [socket, 0, cardSet];

        }
}
  module.exports = playerDict;
