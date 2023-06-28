import React from 'react';
import { Image, StyleSheet, FlatList, Text, TouchableOpacity, View} from 'react-native';
import Tile from './Tile';
// import {purp, cream, deGris } from '../../styles/common';

export let purp = '#2c2c3c';
export let cream = '#cbbba7';
export let deGris = '#968984';

export default class VotingModal extends React.Component{

  constructor(props){
      super(props);
      this.players = [];
      this.cards = [];
      //[data, cardName, player.socketId, playerNickname]
      for (let p in props.subs){
        let temp = props.subs[p];
        let player = {
          id: p,
          socketId: temp[2],
          nickname: temp[3]
        }
        this.players.push(player);
        let item = {
          data: temp[0],
          name: temp[1],
          submitter: temp[2]
        }
        this.cards.push(item);
      }
      this.state = {
        votes: {},
        currentlySelectedUser: '',
      }
    }

    
  _vote(cardName){
    this.state.votes["call"] = !this.state.votes["call"]
    this.state.votes[this.state.currentlySelectedUser] = cardName;
    this.setState({votes: this.state.votes});
  }

  _changeUser(player){
    this.setState({currentlySelectedUser: player.socketId});
  }

  _renderChit = ({item}) => {
    var isCurrentlySelected = (this.state.votes[this.state.currentlySelectedUser] === item.name);
    var chitStyle = (isCurrentlySelected === false) ? StyleSheet.compose(styles.chit) : StyleSheet.compose(styles.clicked_chit);

    return (
      <TouchableOpacity
      onPress ={() => this._vote(item.name)}>
        <Image source={{uri: `data:image/gif;base64,${item.data}`}} style = {chitStyle}/> 
      </TouchableOpacity>
    );
  }

  _renderUser = ({item}) => {
    // var buttonStyle = (this.state.currentlySelectedUser === item.socketId) ? styles : StyleSheet.compose(styles.userButton, styles.clicked_userButton);
    var buttonStyle = (this.state.currentlySelectedUser === item.socketId) ? styles.clicked_userButton : styles.userButton;

    return (
      <TouchableOpacity
      onPress ={() => this._changeUser(item)}
      style= {buttonStyle}>
        <Text style = {styles.nickname}>{item.nickname} </Text>
      </TouchableOpacity>
    );
  }

  _submitVotes(){
    delete this.state.votes["call"];
    this.props.submitVotes(this.state.votes);
  }

  render () {
    return (
      <View style = {[styles.container, {...this.props.styles}]}>

        <View style = {styles.header}>
          <Text style={styles.instructions}>Raise thine ass posterior.</Text>
        </View>
        
       
        
        <View style = {styles.body}>
      
          <View style = {styles.userContainer}>
            <FlatList
              data = {this.players}
              renderItem ={this._renderUser}
              // renderItem={({player}) => <Player player = {player }/>}
              // renderItem={({player}) => console.log(player)}
              // horizontal = {false}
              // keyExtractor={(item, index) => item.id}
              extraData={this.state.currentlySelectedUser}
            ></FlatList>
          </View>

          <View style = {styles.chitContainer}>
            <FlatList
              data = {this.cards}
              renderItem ={this._renderChit}
              horizontal = {true}
              // keyExtractor={(item, index) => item.id}
              extraData={this.state.votes["call"]}
            ></FlatList>
          </View>
          
        </View>

      <View style= {styles.footer}>
        <TouchableOpacity 
          style = {styles.button}
          onPress= {this._submitVotes.bind(this)}>
          <Text style= {styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View> 

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    backgroundColor:cream,
    borderColor: purp,
    borderWidth:5,
    alignItems: "center",
  },
  header:{
    flex:1,
    backgroundColor:cream,
    width:'100%',
  },
  body :{
    flex: 4,
    flexDirection: 'row',
    width: '100%'
  },
  userContainer:{
    flex:1,
    backgroundColor:purp,
  },
  chitContainer:{
    flex:3,
    backgroundColor:'red',
  },
  footer:{
    flex:1,
  },
  button: {
    backgroundColor: purp,
    padding: 15,
    borderRadius: 5,
    marginTop:5,
  },
  buttonText: {
    fontFamily:'sleepy',
    fontSize: 20,
    color: '#cbbba7',
  },
  instructions:{
    color: cream, 
    fontSize: 18,
    marginHorizontal: 15,
    fontFamily:'sleepy',
  },
  chit:{
    width:190,
    height: 190,
    backgroundColor: deGris,
  },
  clicked_chit:{
    width: 200,
    height: 200,
    backgroundColor: deGris,
  },
  nickname:{
    color: purp, 
    fontSize: 18,
    marginHorizontal: 15,
    fontFamily:'sleepy',
  },
  userButton: {
    backgroundColor: cream,
    margin: 15,
    borderRadius: 5,
  },
  clicked_userButton:{
    backgroundColor: 'red',
    margin: 15,
     borderRadius: 5,
  },
});
