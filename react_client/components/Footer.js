
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {purp, cream, deGris } from './../styles/common';

export default function Footer(props) {
  return (
    <View style={styles.container}>
    <View style = {styles.promptDiv}>
      <Text style={styles.prompt}> {props.prompt}</Text>
    </View>
    
    <View style = {styles.baseLine}>
      <Text style={styles.message}> {props.msg}</Text>
        

      <TouchableOpacity onPress = {props.clickHandler}
      style = {styles.button}>
        <Text style= {styles.buttonText}>{props.buttonText}</Text>
      </TouchableOpacity>

    </View>
      

    </View>
    
  );
}

const styles = StyleSheet.create({
  prompt:{
    
    color: purp,
    fontSize:35,
    fontFamily:'sleepy',
  },
  promptDiv:{
    flex:1,
    backgroundColor:cream,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    padding:5,
  },
  message:{
    fontSize: 20,
    flex:3,
    color: cream,
    fontFamily:'sleepy',
    alignItems:'center',
    padding:10,
  },
  baseLine:{
    flex:2,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-end',
    width:'100%',
    padding:10,
  },
  container: {
    flex: 3,
    backgroundColor: purp,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
  },
  button: {
    flex:1,
    backgroundColor: cream,
    padding: 20,
    borderRadius: 5,
    height:'50%',
    justifyContent:'center',
    textAlign:'center',
  },
  buttonText: {
    fontSize: 20,
    color: purp,
    fontFamily:'sleepy',
  }
});
