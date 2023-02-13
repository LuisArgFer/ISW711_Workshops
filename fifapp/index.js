const express = require ('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(express.json())
const teamRoute=require('./Controllers/teamController');
const TeamModel = require("./Models/teamModel");

app.use('/api',teamRoute);
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp").then(()=>console.log('funca'))


app.listen(3000,() => console.log('Fifa app listening on port 3000!'))