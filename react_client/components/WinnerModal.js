import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, StyleSheet, Share, Text, TouchableOpacity} from 'react-native';
import Tile from './Tile'; 

export default function WinnerModal(props) {
  const winnerName = props.winner[0];
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: props.prompt,
        //url:props.winner[2].gif/>
      });
    } 
    catch (error) {
      alert(error.message);
    }
  }
  return (

    <Modal style={styles.container}>

      <Text>The winner was {winnerName} </Text>
      <Tile base64data = {props.winner[1]}></Tile>

      <TouchableOpacity 
       style = {styles.button}
       onPress= {onShare}>
        <Text style= {styles.buttonText}>Share</Text>
      </TouchableOpacity>

    </Modal>
  );
}

const styles = StyleSheet.create({
 
  instructions:{
    color: '#888', 
    fontSize: 18,
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  inputLine: {
    backgroundColor: "grey",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
});
