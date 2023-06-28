import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList} from 'react-native';
import Tile from './Tile';
import {FOREGROUND, LIGHT, DARK, DARK_BORDER} from '@assets/constants.js';


export default class ImageGallery extends React.Component {

  constructor(props){
      super(props);
    }

    chitHandler(selectedId, action){
      this.props.chitHandler(selectedId, action);
    }

    _expander(cardName, cardData){
      this.props.expander(cardName, cardData);
    }

    _renderItem = ({item}) => {
        return (
            <Tile 
                data = {item.data} 
                name = {item.name} 
                id = {item.id} //same as position
                chitHandler = {this.chitHandler.bind(this)}
                cardHeight = {this.props.cardHeight}
                isSelected = {this.props.selectedCard === item.id}
                expander = {this._expander.bind(this)}
              ></Tile>
        );
    }

    render () {
        return (
          <View style={styles.container}>
            <FlatList
              data = {this.props.cards}
              renderItem ={this._renderItem}
              horizontal = {true}
              keyExtractor={(item, index) => item.id}
              extraData={this.props.selectedCard}
            ></FlatList>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: LIGHT,
    width: '100%',
  },
});

