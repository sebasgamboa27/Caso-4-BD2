const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/articulos', {useNewUrlParser: true});

app.listen(3050, function () {
  console.log('MongDB server API listening on port 3050!');
});

const schema = new mongoose.Schema({ Autor: 'string', Fecha: 'string' , Hashtags: 'Array',
Media:'Array',NombreArticulo: 'string', Subtitulos: 'Array', Texto: 'Array', Titulos: 'Array'});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB!')
  // we're connected!
});

app.post('/mongoSearch',((req, res, next) => {

  let words = req.body.hash;

  //let words = ['lise','curiosidad','ciencias'];

  const articulo = db.model('articulo', schema);

  articulo.find({ 'Hashtags': {$in: words} }, function (err, articulo) {
    if (err) return handleError(err);
    console.log(articulo);
    res.send(articulo);
  });

}))