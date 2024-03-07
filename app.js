
// require all installed package
const express = require('express');
const app  = express();
const multer =require('multer');
const bodyParser =  require( 'body-parser');
const rateLimit = require('express-rate-limit');
const mongoose= require('mongoose');
const cors =require('cors');
const route = require('./src/routes/api');


// for use
app.use(rateLimit({
    windowMs: 15*60*1000,    // 15  minutes
     max: 100    //   limit each IP to 100
}));
app.use(cors());
app.use(bodyParser.json());



// mongoDB connection
const username = "user123";
const password = "user111";
const dbname ="database123"

const uri =`mongodb+srv://${username}:${password}@cluster0.9szkjvv.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const options = {autoIndex: true}

mongoose.connect(uri,options)
.then(() =>{
   console.log("connected");
})
.catch((err)=>{
   console.error(err);
})

// use api router
app.use("/api/v1",route);


// for wrong  routes 

app.use('*',(req,res)=>{
    res.status(404).json({message:"page not found"})
});

//  app export
module.exports = app;
