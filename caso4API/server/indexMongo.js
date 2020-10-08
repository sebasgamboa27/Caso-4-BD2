const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const {MongoClient} = require('mongodb');

app.use(cors());
app.use(bodyParser.json());

app.listen(3050, function () {
  console.log('MongDB server API listening on port 3050!');
});

async function main(){
  const uri = "mongodb://localhost:27017/articulos";
  const client = new MongoClient(uri);

  try {
      await client.connect();

      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};