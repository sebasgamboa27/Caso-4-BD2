const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3020, function () {
  console.log('Elastic Search server API listening on port 3020!');
});

"use strict";
exports.__esModule = true;
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});
exports["default"] = client;

app.use('/elastictest',((req, res, next) => {

    client.search({
        index:'listapalabras'
    },(error,response,status) =>
    {
        if(error){
            logger.error(error)
        }
        else
        {
            console.log("--- Response ---");
            console.log(response);
            console.log("--- Hits ---");
            response.hits.hits.forEach(function(hit){
                console.log(hit);})
        }
    }
    )
}))