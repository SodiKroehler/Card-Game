import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {purp, cream, deGris } from './../styles/common';
import Tile from './Tile';
/* props:
      cards
      cardNames
      cardHandler
      */
export default class ImageGallery extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clickedArray : [false, false, false, false, false,false, false]
    }
    this.gifGallery = [];
    this.gallery = [];
    this.currentViewedCardIndex = 0;
  }

  changeSubmission(name){
    var cardName;
    for(var n=0;n<this.props.cardNames.length;n++){
      if(this.props.cardNames[n] == name){
        cardName = this.props.cardNames[name];
        this.props.cardHandler([cardName,n]);
        const list = this.state.clickedArray.map((item,j) => {
          if (j === n){
            return true;
          } else {
            return false;
          }
        });
        this.setState({clickedArray : list});
      }
    }
    
  }

  
  componentDidMount(){
    
    {/*this.gallery = [
      <Tile 
              base64data = {this.props.cards[0]} 
              cardName = {this.props.cardNames[0]} 
              onLikeHandler = {this.changeSubmission.bind(this)}
              clicked = {this.state.clickedArray[0]}
            ></Tile>,
            <Tile 
              base64data = {this.props.cards[1]} 
              cardName = {this.props.cardNames[1]} 
              onLikeHandler = {this.changeSubmission.bind(this)}
              clicked = {this.state.clickedArray[1]}
            ></Tile>,
            <Tile 
              base64data = {this.props.cards[2]} 
              cardName = {this.props.cardNames[2]} 
              onLikeHandler = {this.changeSubmission.bind(this)}
              clicked = {this.state.clickedArray[2]}
            ></Tile>,
            <Tile 
              base64data = {this.props.cards[3]} 
              cardName = {this.props.cardNames[3]} 
              onLikeHandler = {this.changeSubmission.bind(this)}
              clicked = {this.state.clickedArray[3]}
            ></Tile>,
            <Tile 
              base64data = {this.props.cards[4]} 
              cardName = {this.props.cardNames[4]} 
              onLikeHandler = {this.changeSubmission.bind(this)}
              clicked = {this.state.clickedArray[4]}
            ></Tile>,
            <Tile 
              base64data = {this.props.cards[5]} 
              cardName = {this.props.cardNames[5]} 
              onLikeHandler = {this.changeSubmission.bind(this)}
              clicked = {this.state.clickedArray[5]}
            ></Tile>,
            <Tile 
              base64data = {this.props.cards[6]} 
              cardName = {this.props.cardNames[6]} 
              onLikeHandler = {this.changeSubmission.bind(this)}
              clicked = {this.state.clickedArray[6]}
            ></Tile> 
    ]*/}
  }
  render() {
    for (var n=0;n<8;n++){
      this.gallery[n] = 
      <Tile 
        base64data = {this.props.cards[n]} 
        cardName = {this.props.cardNames[n]} 
        onLikeHandler = {this.changeSubmission.bind(this)}
        clicked = {this.state.clickedArray[n]}
        cardSize = {35}
      ></Tile>;
    }

    return (
      <View style={styles.container}>
        <View style = {styles.gallery}>
          {this.gallery}
        </View>
      </View>
    )
  };

}
const styles = StyleSheet.create({
  gallery:{
    flex: 3,
    flexDirection: 'row',
  },
  container: {
    flex: 10,
    flexDirection: 'row',
    backgroundColor: cream,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backwardArrowCube:{
    flex: 1,
    height: '45%',
  },
  forwardArrowCube: {
    flex : 1,
    height: '45%',
    
  },
});

