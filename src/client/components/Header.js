import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './../assets/logo.gif';
import {purp, cream, deGris } from './../styles/common';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoDiv}>
        <Image source={logo} style={styles.logo} /> 
        <Text style={styles.subtitle}> 
          a fucking shitty game
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
    width: '65%', 
    height: '50%',
  },
  subtitle:{
    color: cream, 
    fontSize: 25,
    fontFamily:'sleepy',
  },
  roomForGameRoomNum:{
    flex:1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:purp,
  },  
  gameRoomNum:{
    color: cream, 
    fontSize: 25,
    fontFamily:'sleepy',
  },
  score:{
    flex:1,
    color: purp, 
    fontSize: 40,
    fontFamily:'sleepy',
  },
  scoreVal:{
    flex:2,
    color: purp, 
    fontSize: 60,
    fontFamily:'sleepy',
  },
  details:{
    flex:1,
    backgroundColor: cream,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  logoDiv:{
    flex:3,
    backgroundColor: purp,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    width: '100%',
  },
});
