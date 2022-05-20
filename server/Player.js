
const fs = require('fs');
const imageToBase64 = require('image-to-base64');

class Player{

    constructor(sockId) {
        this.score = 0;
        this.cardSet=[];
        this.playerNumber = null;
        this.id = sockId;
        this.nickName = null;
        this.popularity = 0;
        this.submissionIndex = 0;
        this.ready = false;
        
    }
    emailLookup(player_email){
      this.email = player_email
    }
    setPlayerID(id){
      this.id = id;
    }
    setPlayerNickname(nkName){
      this.nickName = nkName;
    }
    setPlayerNumber(n){
      this.playerNumber = n;
    }
    reset(){
      this.votes = 0;
      this.popularity = 0;
      this.submissionIndex = 0;
    }
  /*  updateCardSet(newCardList){
      this.cardSet = newCardList;
      var cardArray=[];
      for (var card in this.cardSet){
        let index = this.cardSet[card];
          const data = fs.readFile('./memes/' + index + '.json', 'base64', function (err, data){
            if (err) throw err;
            cardArray[card] = [index,data];
          });
    }
  }*/
}

  module.exports = Player;
