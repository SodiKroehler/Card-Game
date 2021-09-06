import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, StyleSheet, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Tile from './Tile';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {purp, cream, deGris } from './../styles/common';

export default function SubmissionsModal(props) {
    var love, hate;

  function submitModal() {
    props.submitRatings([love,hate]);
  }

  function processLike(idx){
    love = idx;
  }

  function processDislike(idx){
    hate = idx;
  }

  return (
    <View style={styles.container}>

      <View style = {styles.header}>
        <Text style={styles.instructions}>Pick the best and the worst:</Text>
      </View>

      <View style = {styles.body}>
        <ScrollView style= {styles.gallery}>
          <Tile base64data = {props.cards[0]} 
          onLikeHandler = {processLike} 
          onDisLikeHandler = {processDislike}
          cardName = {props.cardNameArray[0]}
          ></Tile>
        </ScrollView>
      </View>

      <View style= {styles.footer}>
        <TouchableOpacity 
        style = {styles.button}
        onPress= {submitModal}>
          <Text style= {styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>      

      

    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    backgroundColor:cream,
    borderColor: purp,
    borderWidth:5,
    alignItems: "center",
    position:'absolute',
    zIndex: 2,
    width: 6*(windowWidth/8),
    height: 6*(windowHeight/8),
    top:windowHeight/8,
    left:windowWidth/8,
  },
  header:{
    flex:1,
    backgroundColor:purp,
    width:'100%',
  },
  body:{
    flex:4,
    backgroundColor:cream,
    width:'100%',
  },
  footer:{
    flex:1,
    backgroundColor:purp,
    width:'100%',
  },
  gallery:{
    width:'100%',
    height: 320,
  },
  button: {
    backgroundColor: purp,
    padding: 15,
    borderRadius: 5,
    marginTop:5,
    left:100,
  },
  buttonText: {
    fontFamily:'sleepy',
    fontSize: 20,
    color: '#cbbba7',
  },
  instructions:{
    color: cream, 
    fontSize: 18,
    marginHorizontal: 15,
    fontFamily:'sleepy',
  },
});
