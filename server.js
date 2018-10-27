const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();

//env variables
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
  if(err) return console.error(err);
  require('./app/routes')(app, db);

  app.listen(port, () => {
    console.log('listening on port: ${port}');
  });

  app.close(port, () => {
    console.log('Shut down on port: ${port}');
  }
});
