import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Tile from './Tile'; 

export default function WinnerModal(props) {
  const winnerName = props.winner;

  function exitGame() {
    console.log("user wishes to leave");
  }

  function restartGame() {
    console.log("user wishes to restart the game")
  }

  return (
    <View style = {[styles.container, {...props.styles}]}>
      <Text style = {styles.text}>The winner was {winnerName} </Text>

      {/* Exit Button */}
      {<TouchableOpacity onPress = {exitGame} style = {styles.button}>
            <Text style= {styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      }

      {/* Restart Button */}
      {<TouchableOpacity onPress = {restartGame} style = {styles.button}>
            <Text style= {styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  ontainer: {
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
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  text: {
    fontFamily:'sleepy',
    fontSize: 20,
    color: '#cbbba7',
  }
});
