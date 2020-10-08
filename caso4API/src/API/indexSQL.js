const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { ESRCH } = require('constants');
const app = express();

let user = 'client';
let password = 'publicView1234';
let DB = 'MyDB'
let dbConnString = `mssql://${user}:${password}@localhost/${DB}`;

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('SQL server API listening on port 3000!');
});


app.post('/getHashtagsSQL', async function (req, res) {
  await sql.connect(dbConnString);
  const level = req.body.level;
  
  const result = await sql.query(`
  ejemplo de query para sql server`);                

  res.send(result.recordset);
});