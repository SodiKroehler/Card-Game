import React from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import logo from '@assets/logo.png';

import {FOREGROUND, LIGHT, DARK, DARK_BORDER} from '@assets/constants.js';


export default function IntroModal(props) {
  const [text, onChangeText] = React.useState("");
  const [gameRoomNum, setGameRoomNum] = React.useState("");
  
  function submitModal() {
    //DEBUG ONLY
    props.changeNickname("sodi");
    props.joinGame("room");
    // props.changeNickname(text);
    // props.joinGame(gameRoomNum);
  }

  return (
    <View style = {[styles.container, {...props.styles}]}>

      
      <View style = {styles.logoContainer}>
        <Image source={logo} style={styles.logo} /> 
      </View>

      <View style = {styles.inputContainer}>
        <TextInput
          style = {styles.inputLine}
          onChangeText={onChangeText}
          placeholder={"nickname"}
        />
        <Text style = {styles.instructions}>If you have a game code, enter it here:</Text>
        
        <TextInput
          style = {styles.inputLine}
          onChangeText={setGameRoomNum}
          placeholder={"game room number"}
        />
        <Text style = {styles.instructions}>Otherwise, leave it blank</Text>
        <TouchableOpacity 
        style = {styles.button}
        onPress= {submitModal}>
          <Text style= {styles.buttonText}>Join</Text>
        </TouchableOpacity> 

      </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  logo:{
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  },
  logoContainer:{
    flex: 2,
    width: '45%',
    paddingTop: 10,
    paddingBottom: -3,
    alignItems: "center",
  },
  inputContainer:{
    flex: 5,
    width: '100%',
    alignItems: "center",
  },


  button: {
    backgroundColor: FOREGROUND,
    padding: 15,
    borderRadius: 5,
    marginTop:5,
    width: '20%',
    alignItems: "center",
  },

  instructions:{
    color: LIGHT, 
    fontSize: 18,
    marginHorizontal: 15,
    fontFamily:'sleepy',
  },
  inputLine: {
    backgroundColor: LIGHT,
    padding: 15,
    fontSize: 20,
    width: '45%',
    fontFamily:'sleepy',
    borderRadius: 5,
    margin:10,
  },
  buttonText: {
    fontFamily:'sleepy',
    fontSize: 20,
    color: DARK,
  }
});
