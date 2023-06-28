const promptsList = require('./prompts.json');
const fs = require('fs');


const CORRECT_GUESS_POINT_VALUE = 3;
const MOST_POPULAR_POINT_VALUE = 10;
const WINNING_SCORE = 7;


class Game {

    // Constructor
    constructor(roomNum) {
        this.id = roomNum;
        this.playerDict = [];
        this.numPlayers = 0;
        this.rounds = [];
        this.usedCards = [];
        this.usedPrompts =[];
        this.currentPrompt = "";
        this.submissions=[];
        this.voteDict = {};
        this.votes = 0;
    }

    addPlayer(player){
      console.log(player.nickname, 'joined the room', this.id);
      player.setPlayerNumber(this.playerDict.length);
      this.playerDict[player.playerNumber] = player;
      this.numPlayers++;
    }

    removePlayer(player){
      console.log(player.id, 'left the room', this.id);
      this.playerDict[player.playerNumber] = null;
      this.numPlayers--;
    }

    getPlayer(socketId){
      for (var p=0; p<this.playerDict.length;p++){
        if (this.playerDict[p].socketId === socketId){
          return this.playerDict[p];
        }
      }
    }

    startGame(){
      this.getNewCards();
      this.newPrompt();
    }

    startNewRound(){
      console.log('Creating new round in room ', this.id);
    }

    everyoneIsReady(){
      var areAllReady = true;
      for (var n in this.playerDict){
        var player = this.playerDict[n];
        if (player.isReady() === false) {areAllReady = false;}
      }
      return areAllReady;
    }

    getNewCard(player){
      return((Math.floor(Math.random() * 200))+1);
      // return 2;
    }

    getNewCards(){
      for (var p=0;p<this.numPlayers;p++){
        while (this.playerDict[p].cardSet.length < 7){
          var newCard = this.getNewCard();
          // this.playerDict[p].cardSet.push(newCard);
          if (!(newCard in this.usedCards)){
            this.playerDict[p].cardSet.push(newCard);
            this.usedCards.push(newCard);
          }
        }  
      }
    }

    getReplacementCard(player, replaceIndex){
      var newCardName = this.getNewCard(player);
      player.cardSet[replaceIndex] = newCardName;
      return [replaceIndex, newCardName, null];
    }

    newPrompt(){
      var promptIndex=Math.floor(Math.random() * promptsList.length);
      while (promptIndex in this.usedPrompts){
        promptIndex=Math.floor(Math.random() * promptsList.length);
      }
      // this.currentPrompt = promptsList['20'];
      this.currentPrompt = promptsList[promptIndex.toString()];
      this.usedPrompts.push(promptIndex);
    }

    addSubmission(playerSocketId, cardName, cardPosition){
      this.submissions.push([playerSocketId, cardName, cardPosition]);
      //included cardPosition just in case we want to use this to keep
      //a record in the client of the previous submitted index
    }

    endGame(){
      console.log('game is over');
    }

    tallyVote(guesses){
      this.voteDict[guesses[0][0]] = guesses;
      this.votes +=1;
    }

    completeRound(isWinner){
      const numVotesPerPlayer = {};
      for (let v in this.voteDict){
        var scoreUpdate = 0;
        for (let g = 0; g<this.voteDict[v].length; g++){
          let guessedCardName = this.voteDict[v][g][1]
          let guessedPlayer = this.voteDict[v][g][0]
          if (g === 0){
            if (numVotesPerPlayer[guessedPlayer]){
              numVotesPerPlayer[guessedPlayer]+=1 
            } else {
              numVotesPerPlayer[guessedPlayer]=1 ;
            }
          } else {
            if (guessedCardName === this.voteDict[guessedPlayer][0][1]){
              scoreUpdate += (1 * CORRECT_GUESS_POINT_VALUE);
            } else {
              scoreUpdate -= (1 * CORRECT_GUESS_POINT_VALUE);
            }
          }
        }
        let player = this.getPlayer(this.voteDict[v][0][0]);
        player.updateScore(scoreUpdate);
      }
      let highestNumVotes = 0; 
      let highestVotedPlayer = "";
      for (let sub in numVotesPerPlayer){
        if (numVotesPerPlayer[sub]> highestNumVotes){
          highestNumVotes = numVotesPerPlayer[sub];
          highestVotedPlayer = sub;
        }
      }
      let player = this.getPlayer(highestVotedPlayer);
      player.updateScore(1 * MOST_POPULAR_POINT_VALUE);

      for (let p=0; p<this.numPlayers; p++){
    
        if (this.playerDict[p].score >= WINNING_SCORE){
          var retArray = [this.playerDict[p].nickname, this.playerDict[p].socketId]
          isWinner(retArray);
          return;
        }
      }
    }

    resetForNewRound(){
      this.votes = 0;
      this.submissions = [];
      this.newPrompt();
    }


}

module.exports = Game;
