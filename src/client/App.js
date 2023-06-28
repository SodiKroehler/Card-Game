import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import socketIOClient from "socket.io-client";


//components
import VideoBox from '@components/VideoBox'
import ImageGallery from '@components/ImageGallery.js';
import Header from '@components/Header.js';
import Footer from '@components/Footer.js';
import IntroModal from '@components/IntroModal.js';
import VotingModal from '@components/VotingModal';
import WinnerModal from '@components/WinnerModal.js';
import TileModal from '@components/TileModal.js';

//assets
import {FOREGROUND, LIGHT, DARK, DARK_BORDER} from '@assets/constants.js';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
// const CARDHEIGHT = WIDTH * 0.23;

export default class App extends React.Component {
  constructor() {
    super();
    this.submissions = [],
    this.temporaryCardStorage = [],
    this.socket = socketIOClient("http://localhost:4000");
    this.state = {
      score : 0,
      message : "",
      nickname: "",
      roomNum: "",
      cards: [],
      selectedCard: -1,
      prompt: "i just done shit my pants",
      winner: "",
      userState: "login",
      TileModalState: null,
      cardHeight: Dimensions.get('window').width * 0.29
    };
  }
    
    componentDidMount() {
      this.configureSocket();
      this.fetchFonts();
      this.setDefaultCards();
    }

    fetchFonts = () => {
      return Font.loadAsync({
      'sleepy': require('./assets/fonts/Asleepytiming.otf'),
      });
    };

    configureSocket() {
      this.socket.on("message", (msg) => {
        this.setState({message : msg});
      });

      this.socket.on("serverMessage", (msg) => {
        switch (msg) {
          case "endOfSubmissions" : 
            this.setState({userState: "voting"});
            break;
          case "newRound":
            this.startNewRound();
            break;
        }
      });

      this.socket.on("gameRoomNumber", (msg) => {
        this.setState({roomNum : msg});
      });

      this.socket.on("card", ([cardPosition, name, base64data]) => {

        this.state.cards[cardPosition] = {data: base64data, name: name, id: cardPosition};
        this.setState({cards: this.state.cards});  
      });

      this.socket.on("prompt" , s => {
        this.setState({prompt: s});
        this.setState({mainButtonText: "Choose Card"});

        //this is for the cards, but hopefullly the prompt will be after all the cards
        var fakeSelectedIndex = (this.state.selectedCard < 0) ? this.state.selectedCard-=1 : -1;
        this.setState({selectedCard: fakeSelectedIndex})
      });


      this.socket.on("submissionCard", (tuple) => {
          this.submissions.push(tuple);
    });

      this.socket.on("winner", winnerNickname => {
        //display a winner and then ask if they want to leave or reparty
        this.setState({winner: winnerNickname[1]});
        this.setState({userState: "winner", })
      });

      this.socket.on('scoreUpdate', newScore => {
        const pointChange = newScore - this.state.score;
        var newMessage = "You gained " + pointChange + " points last round.";
        this.setState({message : newMessage});
        this.setState({score: newScore});
      });

    }

    setDefaultCards() {
      var cardCopy = []
      for (let i=0; i<7; i++){
        let newCard = {
          data:"R0lGODlhtAC0AMQAAKQlJ5YmKogmLXkmL2ZfYGgnMlYnNEEoN1lTVzs4RCgoOdPArcu5p8KxobmpmrChlKeYjZOHf4l+eH50cP8iDPUiEHNpaOojFOAjGNQkG8kkHr0kIrElJP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAdACwAAAAAtAC0AAAF/6AijmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNixIOC9LSDxZgCQsMOwgLEGkP0+HSEl/Y2jrc3mcRCw4IJRPS713m291oDQvzJezk9Nn21JWpd4LAvX/ncqQ7Q9BEgggTSEATB0HCPXMTw0GwViLjtI0nPFLjqKChApELqv+ZQFnx4ECALcCJ01hypjh/ImTaxJnT5jgRDXXO5Cl0pkAyJlNYdAdPmjds7faJiKdPxFKpCqjuu9q0KkGuJLRajdr16JikKPIROMHuqbS1JvqJUMt2Ac58WEXIJYi3rj+6cV0ihbmCQcISFi4SRnzQMIrEAh0XVHxOsgmD6iwzNisGrcPFJBZ6ViAa9IiHEWseDk1ZNYrSq0csNDOaxGjYr1uzuN2at9vYIma/BF7Ct+sTuHebDt57OWndJoQPJm7befLo0FVA9enU9Xbuv3NzDlP7tPXsrMMr59693nef6rGPv+a8OvHrJfCnKA8UIP/j8jFUn3n3oSebgSf85979gP0VOF85zqEGYH4IPhdfcRA1iIKECxLH4XkPejEaZiJoRgJkE6ZXInEorviYbiaO0GKMIrRoRl+B/bUAXPxUOBtgPd61o1/HAUmCXAoYOUJbaLDDVFjyjPXkCFRdqOJJZEFZ1VgNYGWRVzBZ1GVHUWI55VTdoVFUOESxZ+WBAq05DU8KyPkTgHbaRUKegpmBkkodRaORRW8ydxRLJEkk6EckmYToSos6RagzlFZq6aWYZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxirrrLTWauutuOaq66689urrr8AGK+ywxBZr7LHIJqvsssw26+yz0EYrLQ4hAAAh+QQFtwAdACwAAAAAAQABAAAFA2AXAgAh+QQFNgEdACwpAEMAMAASAAAF9mAnjmRplsN4pGfrikKVmYIxblQKVFTFvUCSgEI5kDi9EYYiGPQAO4wx+AIQpyIrxdZZCjKVQpbyo7qQReFVtLQCSJUKtpUBCO4cTmCEng/TXUQzJBkUex11dwJ5ezhEjxRvHX1qgDxMJUgbIo6QkR0FAHl2GhgiSKaVRgdEFzQUqaCiHKSxJVOoJUOprBSbukkucye5arxEkiQGa2YmxSO7Ir0CJr3DzZOwJVbHW9XM2CPcJRoUrh3W34DhMERcIper4Crz4QXI4o/ymLf14YUVBhzQsmaaumvYDix5hEHLlDYH2d3igKEOugy/OhjgIMZEKSAhAAA7",
            name: "default",
            id: i
          }
          cardCopy.push(newCard)
      }
      this.setState({cards: cardCopy});
    }

    
    handleNickname = (nickN) => {
      this.setState({nickname: nickN});
      this.socket.emit("nickname", nickN);
    }

    startRoom = idx => {
      this.socket.emit("startRoom",idx);
      this.setState({userState: "waiting" });
      this.setState({roomNum: idx });
    }
    
    _submitVotes(votesDict){
      let guesses = [];
      for (let voter in votesDict){
        if (voter === this.socket.id){
          guesses.unshift([voter, votesDict[voter]]);
        } else {
          guesses.push([voter, votesDict[voter]]);
        }
      }
      this.socket.emit("vote", guesses);
      // this.setState({userState: "ending" });
    }

    changingMainButtonHandler = () => {
      if (this.state.userState === "choosing") {
          var submissionDetails = [this.state.cards[this.state.selectedCard].name, this.state.selectedCard];
          this.socket.emit("submission", submissionDetails );
      } else if (this.state.userState === "ending" ){
        this.setState({userState: "choosing" });
      } else {
        this.setState({userState: "choosing" });
        this.socket.emit("ready","");
      }
    };

    chitHandler(selectedId, action){
      //have to do this, since ImageGallery won't rerender unless selectedCard is changed
       var fakeSelectedIndex = (this.state.selectedCard < 0) ? this.state.selected-1 : -1;
      // TODO : maybe make action an enum?
      if (action === "choose"){
        this.setState({selectedCard: selectedId})
      } else if ( action === "switch"){
        var details = [this.state.cards[selectedId], selectedId, "switch"];
        this.socket.emit("switchCard",  details);
      }
      else if ( action === "condemn"){
        //no current functionality yet
        console.log("user wants to condemn " + selectedId.toString())
        var details = [this.state.cards[selectedId], selectedId, "switch"];
        this.socket.emit("switchCard",  details);
        this.setState({selectedCard: fakeSelectedIndex})
      }
    }

    startNewRound(){
      this.submissions = [];
      this.temporaryCardStorage = [];

      //switch out previously chosen card
      let lastSelectedCardPosition = this.state.selectedCard
      let lastSelectedCardName = this.state.cards[this.state.selectedCard]
      var details = [lastSelectedCardName, lastSelectedCardPosition, "previouslySelected"];
      this.socket.emit("switchCard", details);
      if (this.state.userState != "winner"){
        this.setState({userState: "ending"});
      }
      this.setState({selectedCard: -1});

    }

    _handleTileModal(cardName, cardData){
      if (cardName === null){
        this.setState({TileModalState: null});
      } else {
        // this.socket.emit("preview",cardName);
        // const url = 'C:/Users/sodik/Desktop/Card-Game/assets/gifs/' + cardName + '.gif';
        let bugsBunny = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        let retValue = {"data": cardData, "name": cardName, video: null}
        this.setState({TileModalState: retValue});
      }
    }

    render(){
      var modalVariable;
      
      if (this.state.userState === "login") {
        modalVariable = <IntroModal changeNickname = {this.handleNickname.bind(this)} 
        joinGame = {this.startRoom.bind(this)}
        styles = {styles.modal}/>
      } 
      else if (this.state.userState === "voting"){
        modalVariable = <VotingModal subs = {this.submissions} 
        submitVotes = {this._submitVotes.bind(this)}
        styles = {styles.modal}/>
      } 
      else if (this.state.userState === "winner") {
        modalVariable = <WinnerModal winner= {this.state.winner} 
        styles = {styles.modal}/>
      }
      else {
        modalVariable = null;
      }     
      return (
      <View style={styles.container}>
        <VideoBox 
          style= {styles.videoBox} 
          roomNum = {this.state.roomNum}
          nickname = {this.state.nickname}
        ></VideoBox>
        
        <View style= {styles.gameBox}>
        
          <Header score = {this.state.score} nickname = {this.state.nickname} 
          gameRoomName = {this.state.roomNum}/>
          <View style={styles.hr}></View>
          <ImageGallery 
            cards = {this.state.cards}
            selectedCard = {this.state.selectedCard}
            chitHandler = {this.chitHandler.bind(this)}
            cardHeight = {this.state.cardHeight} 
            expander = {this._handleTileModal.bind(this)}
          />
          {/* <View style={styles.hr}></View> */}
          <Footer msg = {this.state.message} 
            clickHandler = {this.changingMainButtonHandler.bind(this)} 
            userState = {this.state.userState}
            prompt = {this.state.prompt}
          />
        </View>
        {modalVariable}

        <TileModal 
        state = {this.state.TileModalState} 
        style = {styles.TileModal}
        changeContentState = {this._handleTileModal.bind(this)}
        cardHeight = {this.state.cardHeight}
        ></TileModal>

      </View>       
      );   
    }

 
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 'none',
    flexDirection: 'row',
  },
  gameBox :{
    width: '50%',
    height: '100%',
  },
  videoBox: {
    backgroundColor: DARK,
    width:'50%',
    height: '100%',
  },
  hr:{
    flex:1,
    backgroundColor: DARK,
    width:'100%',
  },

  modal: {
    flex: 1,
    width: '75%',
    height: '75%',
    position:'absolute',
    top: '12.5%',
    left: '12.5%',
    zIndex: 4,
    
    backgroundColor: DARK,
    borderColor: DARK_BORDER,
    borderWidth:5,
    borderRadius: 13,
    shadowColor: DARK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  TileModal: {
    width: '70%',
    height: '87.5%', 
    zIndex: 6,
    position:'absolute',
    top: '6.25%',
    left: '15%',

    backgroundColor: DARK,
    borderColor: DARK_BORDER,
    borderWidth:5,
    borderRadius: 13,
    shadowColor: DARK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
});
