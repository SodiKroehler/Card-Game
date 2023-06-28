
import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Tile from './Tile';
import {purp, cream, deGris } from '../../styles/common';
const { width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;

/* props:
      cards
      cardNames
      cardHandler
      */
const CustomCarousel = (props) => {
    const [indexSelected, setIndexSelected] = useState(0);
  const [clickedArray, setClickedArray] = useState([false,false,false,false,false,false,false]);
  const [images, setImages] = useState([
    { id: '0', data: props.cards[0] },
    { id: '1', data: props.cards[1] },
    { id: '2', data: props.cards[2] },
    { id: '3', data: props.cards[3] },
    { id: '4', data: props.cards[4] },
    { id: '5', data: props.cards[5] },
    { id: '6', data: props.cards[6] },
    
  ]);
  const changeSubmission = (idx) => {
        var cardName;
        console.log(idx);
        for(var n=0;n<this.props.cardNames.length;n++){
          if(this.props.cardNames[n] == idx){
            cardName = this.props.cardNames[idx];
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
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };
  return (
    <View style = {styles.container}>
        <Carousel
            layout='default'
            style = {{ flex: 1 / 2, marginTop: 20 }}
            data={images}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem = {index => onSelect(index)}
            renderItem={({ item, index }) => (
                <Image source={{uri: `data:image/gif;base64,${item.data}`}} 
                resizeMode='contain'
                style={{ width: '100%', height: '100%' }}
                key = {index} />
               /* <Tile 
                
                base64data = {item.data} 
                cardName = {props.cardNames[index]} 
                onLikeHandler = {changeSubmission.bind(this)}
                clicked = {clickedArray[index]}
              ></Tile>*/
            )}
        />
        <Pagination
            inactiveDotColor={deGris}
            dotColor={purp}
            activeDotIndex={indexSelected}
            dotsLength={images.length}
            animatedDuration={150}
            inactiveDotScale={1}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    gallery:{
      width:'100%',
      height: 320,
    },
    container: {
      backgroundColor: cream,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 320,
    },
  });
export default CustomCarousel; 



