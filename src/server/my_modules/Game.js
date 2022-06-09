const promptsList = require('./prompts.json');


class Game {

    // Constructor
    constructor(roomNum) {
        this.id = roomNum;
        this.playerDict = [];
        this.playerCount = 0;
        this.rounds = [];
        this.usedCards = [];
        this.usedPrompts =[];
        this.currentPrompt = "";
        this.submissions=[];
        this.votes = 0;
    }

    addPlayer(player){
      console.log(player.id, 'joined the room', this.id);
      player.setPlayerNumber(this.playerDict.length);
      this.playerDict[player.playerNumber] = player;
      this.playerCount++;
    }

    removePlayer(player){
      console.log(player.id, 'left the room', this.id);
      this.playerDict[player.playerNumber] = null;
      this.playerCount--;
    }

    startGame(){
      this.getNewCards();
      this.newPrompt();
    }

    startNewRound(){
      console.log('Creating new round in room ', this.id);
    }

    getNewCards(){

      for (var p=0;p<this.playerCount;p++){

        var cardSet = [];

        while (cardSet.length < 7){
          let newCard = (Math.floor(Math.random() * 227))+1;
          if (!(newCard in this.usedCards)){
            cardSet.push(newCard);
            this.usedCards.push(newCard);
          }
        }
        this.playerDict[p].cardSet = cardSet;
      }
    }

    getReplacementCard(player){
        let newCard = (Math.floor(Math.random() * 227))+1;
        player.cardSet[player.submissionIndex] = newCard;
    }

    newPrompt(){
      const promptIndex=Math.floor(Math.random() * promptsList.length);
      while (promptIndex in this.usedPrompts){
        promptIndex=Math.floor(Math.random() * promptsList.length);
      }
      this.currentPrompt = promptsList[promptIndex];
      this.usedPrompts.push(promptIndex);
    }

    endGame(){
      console.log('game is over');
    }

    manageVotes(loveName, hateName){
      for (let p in this.playerDict){
        if (loveName in this.playerDict[p].cardSet){
          this.playerDict[p].popularity++;
        }
        if (hateName in this.playerDict[p].cardSet){
          this.playerDict[p].popularity--;
        }
      }
    }

    findRoundWinner(){
      for (let i=0;i<this.playerCount;i++){
        var maxPopValue = 0;
        var mostPopularIdx = 0;
        if(this.playerDict[i].popularity > maxPopValue){
          mostPopularIdx = i;
          maxPopValue = playerDict[i].popularity;
        }
      }
      this.rounds.push(this.playerDict[mostPopularIdx].playerNumber);
      this.playerDict[mostPopularIdx].score++;
      return this.playerDict[mostPopularIdx];
    }

    resetForNewRound(){
      for (let i=0;i<this.playerCount;i++){
        this.playerDict[i].reset();
      }
      this.votes = 0;
      this.submissions = [];
      this.newPrompt();
    }


}

module.exports = Game;
