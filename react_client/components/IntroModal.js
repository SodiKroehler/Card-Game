import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Font from 'expo-font';
import { Modal, StyleSheet, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function IntroModal(props) {
  const [text, onChangeText] = React.useState("");
  const [gameRoomNum, setGameRoomNum] = React.useState("");

  function submitModal() {
    props.changeNickname(text);
    props.joinGame(gameRoomNum);
  }

  return (
    <Modal style={styles.container}>
      
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

    </Modal>
  );
}

const styles = StyleSheet.create({
 
  instructions:{
    color: '#2c2c3c', 
    fontSize: 18,
    marginHorizontal: 15,
    fontFamily:'sleepy',
  },
  container: {
    margin: 20,
    backgroundColor: '#cbbba7',
    borderColor: '#2c2c3c',
    borderWidth:5,
    borderRadius: 13,
    padding: 30,
    paddingBottom:15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position:'absolute',
    zIndex: 2,
    width: 350,
    height:350,
    top:(windowHeight-350)/2,
    left:(windowWidth-350)/2,
  },
  button: {
    backgroundColor: "#2c2c3c",
    padding: 15,
    borderRadius: 5,
    marginTop:5,
    left:100,
  },
  inputLine: {
    backgroundColor: "#968984",
    padding: 15,
    fontSize: 20,
    width: 250,
    fontFamily:'sleepy',
    borderRadius: 5,
    margin:10,
  },
  buttonText: {
    fontFamily:'sleepy',
    fontSize: 20,
    color: '#cbbba7',
  }
});
