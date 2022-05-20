import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {purp, cream, deGris } from './../styles/common';

/*props: 
    base64data
    cardName
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
    var clickedStyleContainer = (this.props.clicked === false) ? styles : StyleSheet.compose(styles.container,clkd.container);
    var clickedStyleButtonBar = (this.props.clicked === false) ? styles : StyleSheet.compose(styles.buttonBar,clkd.buttonBar);
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
      <Image source={{uri: `data:image/gif;base64,${this.props.base64data}`}}  style = {styles.tile} /> 
      <View style= {clickedStyleButtonBar}>
        {likeButton}
        {disLikeButton}
      </View>
      

      
      
    </View>
    )
  }
}
const clkd = StyleSheet.create({
  container: {
    backgroundColor: purp,
  },
  buttonBar:{
    backgroundColor:  purp,
  },
});

const styles = StyleSheet.create({
  tile:{
    width: 305, 
    height: 305,
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
    height:30,
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
