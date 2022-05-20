var mysql = require('mysql2');

var nect = mysql.createConnection({
    host: "localhost",
    user: "lilyamatheflappybimbo",
    password: "theB00biesarentreal!"
  });
//var qu = "INSERT INTO `THESEUS`.`users`(user_id, user_email) VALUES ('1', 'tadashihamada@gmail.com')"
var qu = "SELECT * FROM `THESEUS`.`users`"
  nect.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    nect.query(qu, function (err, result) {
      if (err) throw err;
      console.log(result);
      console.log("Database created");
    });
  });