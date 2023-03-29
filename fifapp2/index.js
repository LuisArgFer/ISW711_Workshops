const express = require ('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(express.json())
const teamRoute=require('./Controllers/teamController');
const playerRoute=require('./Controllers/playerController');
const TeamModel = require("./Models/teamModel");
const {base64decode} = require('nodejs-base64');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    if (req.headers["authorization"]) {
      // Basic VVROOlBhc3N3b3JkMQ==
  
      const authBase64 = req.headers['authorization'].split(' ');
      console.log('authBase64:', authBase64);
      const userPass = base64decode(authBase64[1]);
      console.log('userPass:', userPass);
      const user = userPass.split(':')[0];
      const password = userPass.split(':')[1];


        //logica de autenticacion
      if (user === 'admin' && password == '1234') {
        // saveSession('admin');
        next();
        return;
      }
    }
    res.status(401);
    res.send({
      error: "Unauthorized"
    });
  });



app.use('/api',teamRoute);
app.use('/api',playerRoute);

const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp2").then(()=>console.log('funca'))


app.listen(3000,() => console.log('Fifa app listening on port 3000!'))