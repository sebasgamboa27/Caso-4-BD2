const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");

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

//Middleware Function to Check Cache
checkCache = (req, res, next) => {
  const { id } = req.params;

  redis_client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(data);
    } else {
      //proceed to next middleware function
      next();
    }
  });
};

app.post("/hashtags", checkCache, async (req, res) => {
  try {
    const { id } = 1;
    const hash = req.body.hash;
    const starShipInfo = await axios.post(
      `http://localhost:3050/mongoSearch`,{hash,hash}
    );

    //get data from response
    console.log(starShipInfo.data);
    const starShipInfoData = starShipInfo.data;

    //add data to Redis
    redis_client.setex(id, 3600, JSON.stringify(starShipInfoData));

    return res.json(starShipInfoData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//app.listen(port, () => console.log(`Server running on Port ${port}`));

app.listen(5000, function () {
  console.log('Redis server API listening on port 5000!');
});