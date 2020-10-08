const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ESRCH } = require('constants');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('SQL server API listening on port 3000!');
});

var Connection = require('tedious').Connection;  
var config = config = {
  server: 'localhost',
  options: {
    database: "BD2CASO4"
  },
  authentication: {
    type: 'default',
    options: {
      userName: 'SA',
      password: '<hola1234>'
    }
  }
}; 
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    console.log("Connected");  
    //executeStatement();  
});  

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement(levelDown, levelUp) {  
    request = new Request(`SELECT a.nombre FROM Articulos a inner join Hashtags h`, function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    connection.execSql(request);  
}