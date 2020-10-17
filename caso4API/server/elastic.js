const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//Valores
const nivel_derecha = 7;
const nivel_izquierda = 5;
const NIVEL_MAX  =10;

const hashtagsEscogidos = []

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
        index:'palabras_true',
        size:500,
        body: {
            "aggs":{
                // Saca la cuenta de las palabras
                "cuenta_palabras": {
                        "terms":{
                            "field": "palabra.keyword",
                            "size":100
                        }
                },
                "valor_maximo": {
                    "max_bucket":{
                        "buckets_path": "cuenta_palabras._count"
                    }
                },
                "valor_minimo": {
                    "min_bucket":{
                        "buckets_path": "cuenta_palabras._count"
                    }
                }
            },
            
        }
    },(error,response,status) =>
    {
        if(error){
            console.log(error)
        }
        else
        {
            //console.log("--- Response ---");
            //console.log(response);
            console.log("--- Hits ---");
            
            res.send(response);
            const valorPorNivel = Math.round((response.aggregations.valor_maximo.value - response.aggregations.valor_minimo.value) /NIVEL_MAX);
            const minHashtags = (NIVEL_MAX - nivel_derecha)*valorPorNivel;
            const maxHashtags = (NIVEL_MAX - nivel_izquierda + 1 )*valorPorNivel;

            console.log(minHashtags,maxHashtags, response.aggregations.valor_maximo.value,response.aggregations.valor_minimo.value);
        
            response.aggregations.cuenta_palabras.buckets.forEach(function(hit){
                if (hit.doc_count >= minHashtags && hit.doc_count <= maxHashtags){
                    console.log(hit.key,hit.doc_count);
                    hashtagsEscogidos.push(hit.key);
                }});
            console.log(hashtagsEscogidos);
        }
    }
    )
}))