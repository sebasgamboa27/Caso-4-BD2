const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require('cors');

//setup port constants
const port_redis = process.env.REDIS_PORT || 6379;
const port = process.env.PORT || 5000;

//configure redis client on port 6379
const redis_client = redis.createClient(port_redis);

//configure express server
const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

function hash(value){
  var hash = 0, i, chr;
    for (i = 0; i < value.length; i++) {
      chr   = value.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}


//Middleware Function to Check Cache
function checkCache(id){
  let newData =null;
  redis_client.get(id, (err, data) => {
      if (err) {
        console.log(err);
        newData = null;
      }
      //if no match found
      if (data !== null) {
        //console.log(data);
        newData = data;
        //console.log(newData);
        
      } 
      else {
        console.log('Is not on cache');
        newData = null;
      }
    })
  //console.log(newData);
  return newData;
};

app.get('/hashtags', (async (req, res, next) => {

  let words = req.body.hash;
  let idString = words.toString();
  console.log(words);
  console.log('este es el string:',idString);
  let id = hash(idString);

  const newData = await checkCache(id);
  //console.log('Si');
  console.log(newData);

  if (newData == null){
    console.log('hola');
    try {
      console.log('Fetching data');
      const starShipInfo = await axios.post(
      `http://localhost:3050/mongoSearch`,{hash:words});
      
      //get data from response
      const starShipInfoData = starShipInfo.data;
      console.log(starShipInfoData);
      redis_client.setex(id, 3600, JSON.stringify(starShipInfoData));
      res.send(starShipInfoData);
    } 
    catch (error) {
          
          console.log(error);
          return res.status(500).json(error);
    }
  }
  else{
    res.send(newData);
  }

}));

app.post('/hashtagsSQL', (async (req, res, next) => {

  let words = req.body.hash;
  words.push('SQL');
  let idString = words.toString();
  console.log(words);
  console.log('este es el string:',idString);
  let id = hash(idString);
  console.log(id);


  const newData = await checkCache(id);
  console.log('Si');
  console.log(newData);

  if (newData == null){
    console.log('hola');
    try {
      console.log('Fetching data');
      const starShipInfo = await axios.post(
      `http://localhost:3000/getHashtagsSQL`,{hash:words});
      
      //get data from response
      const starShipInfoData = starShipInfo.data;
      console.log(starShipInfoData);
      redis_client.setex(id, 3600, JSON.stringify(starShipInfoData));
      res.send(starShipInfoData);
    } 
    catch (error) {
          
          console.log(error);
          return res.status(500).json(error);
    }
  }
  else{
    res.send(newData);
  }

}));

app.post('/hashtagsMongo', (async (req, res, next) => {

  let words = req.body.hash;
  words.push('Mongo');
  let idString = words.toString();
  console.log(words);
  console.log('este es el string:',idString);
  let id = hash(idString);
  console.log(id);


  const newData = await checkCache(id);
  console.log('Si');
  console.log(newData);

  if (newData == null){
    console.log('hola');
    try {
      console.log('Fetching data');
      const starShipInfo = await axios.post(
      `http://localhost:3050/mongoSearch`,{hash:words});
      
      //get data from response
      const starShipInfoData = starShipInfo.data;
      console.log(starShipInfoData);
      redis_client.setex(id, 3600, JSON.stringify(starShipInfoData));
      res.send(starShipInfoData);
    } 
    catch (error) {
          
          console.log(error);
          return res.status(500).json(error);
    }
  }
  else{
    res.send(newData);
  }

}));


app.listen(5000, function () {
  console.log('Redis server API listening on port 5000!');
});

