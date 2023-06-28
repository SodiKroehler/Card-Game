import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '@assets/logo.png';
import {FOREGROUND, LIGHT, DARK, DARK_BORDER} from '@assets/constants.js';

export default function Header(props) {
  // const redusTry = useSelector( state => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.logoDiv}>
        <Image source={logo} style={styles.logo} /> 
        <Text style={styles.subtitle}> 
          for chits and gigs
        </Text>
      </View>
      
      <View style={styles.details}>
        <View style ={styles.roomForGameRoomNum}>
          <Text style={styles.gameRoomNum}> {props.gameRoomName}</Text>
        </View>
        
        <Text style={styles.score}> Score</Text>
        <Text style={styles.scoreVal}> {props.score}</Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  logo:{
    resizeMode: 'contain',
    width: '80%',
    height: '80%'
  },
  subtitle:{
    marginTop: '1%',
    color: FOREGROUND, 
    fontSize: 25,
    fontFamily:'sleepy',
  },
  roomForGameRoomNum:{
    flex:1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:FOREGROUND,
    borderBottomColor: DARK,
    borderBottomWidth: 2,
  },  
  gameRoomNum:{
    color: DARK, 
    fontSize: 25,
    fontFamily:'sleepy',
  },
  score:{
    flex:1,
    color: DARK, 
    fontSize: 40,
    fontFamily:'sleepy',
  },
  scoreVal:{
    flex:2,
    color: DARK, 
    fontSize: 60,
    fontFamily:'sleepy',
  },
  details:{
    flex:1,
    backgroundColor: FOREGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  logoDiv:{
    flex:3,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    flex: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection:'row',
    width: '100%',
  },
});
