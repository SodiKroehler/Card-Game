const relDB = require('./logic/rel_server');
const express = require("express");
const app = express();

const server = new relDB();



app.get("/",(req,res) => {
      res.send("the brits are coming");
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
