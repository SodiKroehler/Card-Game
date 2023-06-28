// import React, { useState, useRef } from 'react';
// import {
//   TouchableOpacity,
//   View,
//   Text,
//   Image,
//   FlatList,
//   Dimensions,
//   StyleSheet
// } from 'react-native';
// import {purp, cream, deGris } from './../styles/common';
require('dotenv').config();

const VideoBox = (props) => {
  appId = process.env.ZEGO_APP_ID
  server = process.env.ZEGO_SERVER
  const zg = new ZegoExpressEngine(appID, server);

    // Room status update callback
  zg.on('roomStateChanged', (roomID, reason, errorCode, extendData) => {
    if (reason == 'LOGINING') {
        // Logging in.
    } else if (reason == 'LOGINED') {
        // Login successful.
        // Only after a user successfully logs in to a room or switches the room, can `startPublishingStream` and `startPlayingStream` be called to publish and play streams properly.
        // Publish streams to ZEGOCLOUD audio and video cloud.
    } else if (reason == 'LOGIN_FAILED') {
        // Login failed.
    } else if (reason == 'RECONNECTING') {
        // Reconnecting.
    } else if (reason == 'RECONNECTED') {
        // Reconnection successful.
    } else if (reason == 'RECONNECT_FAILED') {
        // Reconnection failed.
    } else if (reason == 'KICKOUT') {
        // Forced to log out of a room.
    } else if (reason == 'LOGOUT') {
        // Logout successful.
    } else if (reason == 'LOGOUT_FAILED') {
        // Logout failed.
    }
  });

  //   // Notification of users joining or leaving a room
  // // The `roomUserUpdate` callback can be received only when `ZegoRoomConfig` in which the `userUpdate` parameter is set to `true` is passed in the `loginRoom` method.
  // zg.on('roomUserUpdate', (roomID, updateType, userList) => {
  //   if (updateType == 'ADD') {
  //       for (var i = 0; i < userList.length; i++) {
  //           console.log(userList[i]['userID'], 'joins the room:', roomID)
  //       }
  //   } else if (updateType == 'DELETE') {
  //       for (var i = 0; i < userList.length; i++) {
  //           console.log(userList[i]['userID'], 'leaves the room:', roomID)
  //       }
  //   }
  // });

  // zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
  //   // Notification of audio or video stream updates of other users in a room
  // });

  // Log in to a room. If the login succeeds, `true` is returned.
  // The `roomUserUpdate` callback can be received only when `userUpdate` is set to `true`.

  let userID = 'user_' + new Date().getTime();
  let userName = "user0001";
  let roomID = "0001";
  let token = process.env.ZEGO_TEMP_TOKEN;

  zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true }).then(result => {
      if (result == true) {
          console.log("login success")
      }
  });
}