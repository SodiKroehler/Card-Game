
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {FOREGROUND, LIGHT, DARK} from '@assets/constants.js';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Footer(props) {
  var mainButtonText = "";
  if (props.userState === "waiting" || props.userState === "ending"){
    mainButtonText = "Let's Begin";
  } else if (props.userState === "choosing"){
    mainButtonText = "Submit";
  } else {
    mainButtonText = props.userState;
  }  

  return (
    <View style={styles.container}>

      <View style = {styles.promptBox}>
        <Text style={styles.prompt}> {props.prompt}</Text>
      </View>
    
      <View style = {styles.baseLine}>
        <Text style={styles.message}> {props.msg}</Text>
          

        <TouchableOpacity onPress = {props.clickHandler}
        style = {styles.button}>
          <Text style= {styles.buttonText}>{mainButtonText}</Text>
        </TouchableOpacity>

      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: DARK,
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width:'100%',
  },
  promptBox:{
    flex:3,
    width:'100%',
    padding:10,
    backgroundColor:FOREGROUND,
    alignItems:'center',
    justifyContent:'center',
  },
  prompt:{
    color: DARK,
    fontSize:25,
    fontFamily:'sleepy',
  },
  baseLine:{
    flex:3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-end',
    width:'100%',
    padding:10,
  },
  message:{
    fontSize: 20,
    flex:3,
    color: FOREGROUND,
    fontFamily:'sleepy',
    alignItems:'center',
    padding:10,
  },


 
  button: {
    flex:1,
    backgroundColor: FOREGROUND,
    padding: 20,
    borderRadius: 5,
    height:'50%',
    justifyContent:'center',
    textAlign:'center',
  },
  buttonText: {
    fontSize: 20,
    color: DARK,
    fontFamily:'sleepy',
  }
});
