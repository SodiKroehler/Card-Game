
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
    loadPlayer(info){
      for (key in Object.keys(info)){
        if (key == "user_id") this.playerID = info[key];
        else if (key == "user_email") this.email = info[key];
        else if (key == "user_name") this.name = info[key];
        else if (key == "user_riddle") this.riddle = info[key];
        else if (key == "user_ridAnswer") this.ridAnswer = info[key];
        else if (key == "user_adultContent") this.adultCont = info[key];
        else if (key == "user_color") this.color = info[key];
      }
    }
    getRiddle(){
      return this.riddle;
    }
    getUserName(){
      return this.name;
    }
    setPlayerID(id){
      this.id = id;
    }
    setPlayerNumber(n){
      this.playerNumber = n;
    }
    authenticate(ridAnswer){
      if (ridAnswer == this.ridAnswer) {
        return true;
      } else return false;
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
