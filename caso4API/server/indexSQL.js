const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { ESRCH } = require('constants');
const app = express();


app.use(cors());
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('SQL server API listening on port 3000!');
});

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

const dbConnString = 'mssql://SA:<hola1234>@localhost/BD2CASO4';

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
 
    console.log("Connected");  
 
}); 

app.post('/getHashtagsSQL', async function (req, res) {
  await sql.connect(dbConnString);

  const words = req.body.hash;

  //console.log(words[0]);

  let queryString = `SELECT a.NombreArticulo, a.Autor,a.Fecha, h.Nombre as Hashtags,m.LinkMedia as Media
  FROM Articulo a inner join HashtagXArticulo ha on a.ArticuloId = ha.ArticuloId
      inner join Hashtags h on ha.HashtagId = h.HashtagId left join Media M on a.ArticuloId = M.ArticuloId WHERE `;
  
  for (let i = 0; i < words.length; i++) {

    if(i === words.length - 1){
      queryString += `h.Nombre = '${words[i]}'`
    }
    else{
      queryString += `h.Nombre = '${words[i]}' or `
    }
  }
  
  const result = await sql.query(queryString); 
  
  //executeStatement(words);

  res.send(result.recordset);
});

function executeStatement(words) {

  let queryString = `SELECT a.NombreArticulo, a.Autor,a.Fecha, h.Nombre as Hashtags,m.LinkMedia as Media
  FROM Articulo a inner join HashtagXArticulo ha on a.ArticuloId = ha.ArticuloId
      inner join Hashtags h on ha.HashtagId = h.HashtagId left join Media M on a.ArticuloId = M.ArticuloId WHERE `;
  
  for (let i = 0; i < words.length; i++) {

    if(i === words.length - 1){
      queryString += `h.Nombre = '${words[i]}'`
    }
    else{
      queryString += `h.Nombre = '${words[i]}' or `
    }
  }
    
  request = new Request(queryString, function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
    }
  });

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      console.log(column.value);
    });
  });

  connection.execSql(request);
}