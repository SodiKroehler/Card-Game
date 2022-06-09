var mysql = require('mysql2');
let rooms = [];

var nect = mysql.createConnection({
    host: "localhost",
    user: "lilyamatheflappybimbo",
    password: "theB00biesarentreal!"
  });

 exports.findPlayer = (playerEmail) => {
    qu = "SELECT * FROM `THESEUS`.`users` WHERE `user_email` = ?;"
    nect.connect(function(err) {if (err) throw err;});
    return new Promise(function(resolve, reject){
      nect.query(qu, playerEmail, (err, results) => {
      if (!err){ resolve(results[0]);}
      else {reject(err);}
      });
   });
  }

  exports.findRoom = (roomId) => {
    return new Promise(function(resolve, reject){
      room = null;
      for (i=0;i<rooms.length;i++){
        if (rooms[i].id === roomId){
          room = rooms[i];
        }
      }
      if(true) resolve(room);
      else {reject(err);}
      });
    }
    
  exports.nect = nect;
  