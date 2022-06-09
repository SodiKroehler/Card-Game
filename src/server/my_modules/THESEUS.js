const mysql = require('mysql2');
const fs = require('fs');
const waitPort = require('wait-port');

//remove before prod:
//- secrets
const {
  MYSQL_HOST: HOST,
  MYSQL_HOST_FILE: HOST_FILE,
  MYSQL_USER: USER,
  MYSQL_USER_FILE: USER_FILE,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_PASSWORD_FILE: PASSWORD_FILE,
  MYSQL_DB: DB,
  MYSQL_DB_FILE: DB_FILE,
} = process.env;
// let DB= "THESEUS";
// let HOST= "localhost";
// let USER= "lilyamatheflappybimbo";
// let PASSWORD= "theB00biesarentreal";
 //MYSQL_DB_FILE: "./../../persist/mySQL_data"

// end remove b4 prod


let pool;

async function initDB(){
  const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
  const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
  const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
  //const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;
  const database = "theseus";
  
  //wait for mysql container to boot up
  await waitPort({ host, port : 3306});

  pool = mysql.createPool({
    connectionLimit: 5,
    host,
    user,
    password,
    database,
    charset: 'utf8mb4',
  });
  
  return new Promise((acc, rej) => {
    qu = 'CREATE TABLE IF NOT EXISTS users \
    (id INT PRIMARY KEY, email varchar(255) NOT NULL, name varchar(255), color varchar(255), mature BOOLEAN)'
    
    pool.query(qu, (err) => {
      if (err) return rej(err);
      console.log(`Connected to mysql db at host ${host}`);
      acc();
     }
    );
  });
}

async function find_user(email) {
  return new Promise((acc, rej) => {
      pool.query('SELECT * FROM users WHERE id=?', [email], (err, rows) => {
          if (err) return rej(err);
          acc(rows);
      });
  });
}
  //   _connectAndQuery(query, vars){
  //     pool.getConnection((err, connection) => {
  //       if(err) throw err;
  //       console.log('connected as id ' + connection.threadId);
  //       connection.query(query, vars, (err, results) => {
  //         connection.release();
  //         if (err) throw err;
  //         return results;
  //       });
  //     });
  //   }
  //   find_user = (email) => {
  //       qu = mysql.format("SELECT * FROM `THESEUS`.`users` WHERE `user_email` = ?;", email);
  //       return this._connectAndQuery(qu);
  //   }
  //   add_user = (name, email, adultCont, color){
  //     let details = [name, email, adultCont, color, rid, ridAnswer];
  //     let detailNames = [user_name, user_email, user_adultContent, user_color, user_riddle, user_ridAnswer];
  //     qu = mysql.format("INSERT INTO `THESEUS`.`users` VALUES (?,?)';", [detailNames, details]);
  //       return this._connectAndQuery(qu);
  //   }
  // }
  
    
  // }

  //START DEV//
      // this.server = mysql.createConnection({
      //   host: HOSTNAME,
      //   user: SERVER_USERNAME,
      //   password: SERVER_PASSWORD
      // });
      // server.connect(function(err) {if (err) throw err;});

      // server = mysql.createConnection({
   
  // }); 
  // server.connect(function(err) {if (err) throw err;});

  // return new Promise((acc, rej) => {
  //     const qu = "SHOW DATABASES";
  //     server.query(qu, (err) => {
  //       if (err) return rej(err);
  //       console.log(`Connected to mysql db at host`);
  //       acc();
  //      }
  //     );
  //   });
//END DEV//
module.exports = {
  initDB,
  find_user
};