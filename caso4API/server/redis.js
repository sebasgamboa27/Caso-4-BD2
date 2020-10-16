const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require('cors');

//setup port constants
const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || 5000;

//configure redis client on port 6379
const redis_client = redis.createClient(port_redis);

//configure express server
const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Middleware Function to Check Cache


app.get('/hashtags', (async (req, res, next) => {

  let words = ['lise','curiosidad','ciencias'];
  let id = 1;

  const newData = await checkCache(id);
  //console.log(newData);

  if (newData === null){
    console.log('hola');
    try {
      console.log('xew')
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

//app.listen(port, () => console.log(`Server running on Port ${port}`));

app.listen(5000, function () {
  console.log('Redis server API listening on port 5000!');
});

function checkCache(id){
  let newData;
  redis_client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      newData = null;
    }
    //if no match found
    if (data != null) {
      //console.log(data);
      newData = data;
      console.log(newData);
      
    } 
    else {
      console.log('no hay');
      newData = null;
    }
  }
)
console.log(newData);
return newData;};