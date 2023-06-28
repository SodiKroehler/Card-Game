import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FOREGROUND, LIGHT, DARK, ACCENT} from '@assets/constants.js';
import logo from '@assets/logo.png';
import zoomLogo from '@assets/chitters_zoom.png';
import switchLogo from '@assets/chitters_close.png';


export default class Tile extends React.Component {
// export default function Tile(props) {
  
  
  constructor(props){
    super(props);
  }

  _handleLike(){
    this.props.chitHandler(this.props.id, "choose");
  }

  _handleSwitch(){
    this.props.chitHandler(this.props.id, "switch");
  }

  _expandTile(){
    this.props.expander(this.props.name, this.props.data);
  }
  
  render() {
    const chitSize = {
      width: (this.props.cardHeight *4)/5,
      height: this.props.cardHeight,
    };
    
    var containerStyleBySelected = (this.props.isSelected === false) ? styles.container : styles.clicked_container;
    var chitStyle = StyleSheet.compose(styles.chit, chitSize);

    return (
      <View style={containerStyleBySelected}>
        {/* <Image source={logo} style = {styles.cardLogo} /> */}
        <View style = {styles.buffer} />


        {/* Zoom Button */}
        {<TouchableOpacity onPress = {this._expandTile.bind(this)} style = {styles.zoomButton}>
          <Image source={zoomLogo}  style = {styles.icon} /> 
        </TouchableOpacity>
        }

        <TouchableOpacity onPress = {this._handleLike.bind(this)}>
          <Image source={{uri: `data:image/gif;base64,${this.props.data}`}}  style = {chitStyle} /> 
        </TouchableOpacity>

        {/* Switch Button */}
        {<TouchableOpacity onPress = {this._handleSwitch.bind(this)} style = {styles.switchButton}>
          <Image source={switchLogo}  style = {styles.icon} /> 
        </TouchableOpacity>
        }

        <View style = {styles.buffer} />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  cardLogo:{
    resizeMode: 'contain',
    width: '70%',
    height: '20%',
    marginBottom: '-5%'
  },
  container: {
    flex: 1,
    backgroundColor: LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  clicked_container: {
    flex: 1,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buffer:{
    flex: 2,
  },
  chit:{
    margin: 2,
  },
  zoomButton:{
    zIndex:16,
    position: "absolute",
    bottom: 10,
    right: 5,
  },
  switchButton:{
    zIndex:16,
    position: "absolute",
    bottom: 10,
    left: 5,
  },
  icon: {
    // zIndex:16,
    width: 35,
    height: 35,
  }
});