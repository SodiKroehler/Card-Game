import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {purp, cream, deGris } from './../styles/common';

/*props: 
    base64data
    onLikeHandler   
    onDisLikeHandler
    cardName
    cardSize
*/
export default class Tile extends React.Component {
  
  constructor(props){
    super(props);
  }

 handleDislike(){
    this.props.onDisLikeHandler(this.props.cardName);
  }
  handleLike(){
    this.props.onLikeHandler(this.props.cardName);
  }
  
  render() {

    const tileSize = {
      width: this.props.cardSize, 
      height: ,
  };
  const clkd = {
    container: {
      backgroundColor: purp,
    },
    buttonBar:{
      backgroundColor:  purp,
      height:(this.props.cardSize/4),
    },
  };

    var clickedStyleContainer = (this.props.clicked === false) ? styles : StyleSheet.compose(styles.container,clkd.container);
    var clickedStyleButtonBar = (this.props.clicked === false) ? styles : StyleSheet.compose(styles.buttonBar,clkd.buttonBar);
    var dynamicTile = StyleSheet.compose(styles.tile, tileSize);
    var likeButton = null;
    var disLikeButton = null;
    if (this.props.onLikeHandler != null){
      likeButton = <TouchableOpacity onPress = {this.handleLike.bind(this)} style = {styles.button}>
        <Text style= {styles.likeButtonText}>:)</Text>
      </TouchableOpacity>
    }
    if (this.props.onDisLikeHandler != null){
      disLikeButton = <TouchableOpacity onPress = {this.handleDislike.bind(this)} style = {styles.button}>
        <Text style= {styles.dislButtonText}>:/</Text>
      </TouchableOpacity>
    }

    return (
      <View style={clickedStyleContainer} >
      <Image source={{uri: `data:image/gif;base64,${this.props.base64data}`}}  style = {dynamicTile} /> 
      <View style= {clickedStyleButtonBar}>
        {likeButton}
        {disLikeButton}
      </View>
      

      
      
    </View>
    )
  }
}


const styles = StyleSheet.create({
  tile:{
    margin: 2,
  },
  container: {
    flex: 1,
    backgroundColor: cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: purp,
    justifyContent:'center',
    textAlign:'center',
    borderWidth:2,
    width:27,
    height: 27,
    left:15,
    borderRadius: 14,

  },
  buttonBar:{
    backgroundColor: cream,
    width:'100%',
  },
  likeButtonText: {
    fontSize: 26,
    color: cream,
    transform: [
      { rotateX: "-2deg" },
      { rotateY: "60deg" },
      {rotateZ: "90deg" },
      /*{ translateZ: 5 }*/
    ]
  },
  dislButtonText: {
    fontSize: 26,
    color: cream,
    transform: [
      { rotateX: "-2deg" },
      { rotateY: "-10deg" },
      {rotateZ: "90deg" },
      //{ translateZ: -1 }
    ]
  }
});
