import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {StyleSheet, View, Text } from 'react-native';

// import {purp, cream, deGris } from '../../styles/common';


export let purp = '#2c2c3c';
export let cream = '#cbbba7';
export let deGris = '#968984';



function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App(props) {
  if (true){
  // if (props.roomNum === ""){
    return (<div></div>);
  } else {
      const roomID = props.roomNum;
      // const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 1235063992;
      const serverSecret = "d05204cb9a1005bc87e7e4ed61abeedf";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  props.nickname);


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        // sharedLinks: [
        //   {
        //     name: 'Personal link',
        //     url:
        //      window.location.protocol + '//' + 
        //      window.location.host + window.location.pathname +
        //       '?roomID=' +
        //       roomID,
        //   },
        // ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        branding: {},
        layout: "grid",
        showLayoutButton: false,
        showScreenSharingButton: false,
        showPinButton: false,
        maxUsers: 4,
        showTextChat: false,
        showUserList: false,
        showRemoveUserButton: false,
        showPreJoinView: false,
        showRoomDetailsButton: false,
        console: "none",
      });


  };
  const mystyle = {
    color: "white",
    backgroundColor: '#FFFF3c',
    height: '100vh',
    width: '50vw',
  };

  
    return (
      <View style = {styles.videoBox}>
        <div
        className="myCallContainer"
        ref={myMeeting}
        style={mystyle}
      ></div>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
 
  videoBox:{
    color: purp, 
  },
});