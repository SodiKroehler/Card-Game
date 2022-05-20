import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import socketIOClient from "socket.io-client";
import ImageGallery from './components/ImageGallery.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import IntroModal from './components/IntroModal.js';
import SubmissionsModal from './components/SubmissionsModal';
import WinnerModal from './components/WinnerModal.js';
import {purp, cream, deGris } from './styles/common';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




export default class App extends React.Component {
  constructor() {
    super();
    this.submissionsToRate = [],
    this.submissionsToRateDetails = [],
    this.state = {
      message: "dickhead",
      score : 1,
      message : "fuck you",
      nickname: "milo",
      roomNum: "",
      submissionCardDetails : [ "",0],
      
      cardNameArray : [0,0,0,0,0,0,0],
      cardArray : [
      "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",

      ],
      prompt: "guys theres supposed to be somethin here",
      winner: [],
      modalType: "intro",
      mainButtonText: "I'm Ready",
      jacob: "",
      esau: ""
    };
  }
    
    socket = socketIOClient("http://localhost:9000");
    
    handleNickname = (nickN) => {
      this.setState({nickname: nickN});
      this.socket.emit("nickname", nickN);
    }

    componentDidMount() {
      this.configureSocket();
      this.fetchFonts();
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

      this.socket.on("gameRoomNumber", (msg) => {
        this.setState({roomNum : msg});
      });

      this.socket.on("card", ([cardName, data]) => {

        const subCardIdx = this.state.submissionCardDetails[1];
        const priv_theCardArray = this.state.cardArray;
        const priv_CardNameArray = this.state.cardNameArray;
        const priv_NewCardArray = this.onNewCard(subCardIdx, data, priv_theCardArray);
        const priv_NewCardNameArray = this.onNewCard(subCardIdx, cardName, priv_CardNameArray);

        this.setState({cardArray : priv_NewCardArray});
        this.setState({cardNameArray : priv_NewCardNameArray});
        
        if(this.state.cardNameArray[6] === 0){
          this.setState({submissionCardDetails:["", (subCardIdx+1)]})
        }  
      });

      this.socket.on("prompt" , s => {
        this.setState({prompt: s});
        this.setState({mainButtonText: "Choose Card"});
      });

      this.socket.on("modal", a => {
        this.submissionsToRate = a;
        this.setState({
          modalType: "submission",
        });
      });

      this.socket.on("modalCard", (data) => {
        this.submissionsToRateDetails.push(data);
    });

      this.socket.on("winner", a => {
        // a = [nickname, data, index]
        console.log(a);
        this.setState( {winner: a});
        this.setState({modalType: "winner",})
        setTimeout(() => {
          this.setState({modalType: "none",});
        }, 10000);
      });
    }
    
    onNewCard = (i, data, arrayToBeIterated) => {
        const list = arrayToBeIterated.map((item, j) => {
          if (j === i) {
            return data;
          } else {
            return item;
          }
        });
        return list;
    };

    joinCorrectTypeGameRoom = idx => {
      if(idx.length === 0){
        this.socket.emit("startRoom",idx);
      } else {
        this.socket.emit("joinRoom",idx);
        this.setState({roomNum : idx});
      }
      this.setState({modalType: "none" })
    }
    
    submitRatings(tuple){
      this.socket.emit("vote", tuple);
    }

    changingMainButtonHandler = () => {
      if (this.state.mainButtonText === "Choose Card") {
          var subName = this.state.submissionCardDetails[0];
          this.socket.emit("submission", subName );
      } else {
        this.socket.emit("ready","");
      }
    };

    changeSubmissionHandler(tuple){
      //tuple = [cardName, index]
      this.setState({ submissionCardDetails : tuple})
    }

    render(){
      var modalVariable;
      if (this.state.modalType === "intro"){
        modalVariable = <IntroModal changeNickname = {this.handleNickname.bind(this)} joinGame = {this.joinCorrectTypeGameRoom.bind(this)}/>
      } else if (this.state.modalType === "submission"){
        modalVariable = <SubmissionsModal cards = {this.submissionsToRateDetails} cardNameArray = {this.submissionsToRate} submitRatings = {this.submitRatings.bind(this)}/>
      } else if (this.state.modalType === "winner"){
        modalVariable = <WinnerModal winner= {this.state.winner} prompt = {this.state.prompt}/>
      }
      else if (this.state.modalType === "none"){
        modalVariable = null;
      }
        
      
      
      return (
            <View style={styles.container}>
             
              <View style= {styles.videoBox}></View>
              <View style= {styles.gameBox}>
                
                <Header score = {this.state.score} nickname = {this.state.nickname} gameRoomName = {this.state.roomNum}/>
                <View style={styles.hr}></View>
                <ImageGallery 
                cards = {this.state.cardArray} 
                cardNames = {this.state.cardNameArray}
                cardHandler = {this.changeSubmissionHandler.bind(this)} 
                />
                <View style={styles.hr}></View>
                <Footer msg = {this.state.message} 
                clickHandler = {this.changingMainButtonHandler.bind(this)} 
                buttonText = {this.state.mainButtonText}
                prompt = {this.state.prompt}/>
                </View>
              {modalVariable}
            </View>
            
          );   
    }

 
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: deGris,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 'none',
  },
  gameBox :{
    width: windowWidth > 500 ? '50%' : '100%',
    height: '100%',
  },
  videoBox: {},
  hr:{
    flex:1,
    backgroundColor:purp,
    width:'100%',
  },
  
});
