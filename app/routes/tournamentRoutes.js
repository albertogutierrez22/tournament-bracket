var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.post('/tournament', (req, res) => {
    const collection = db.get('tournaments');
    const tournament = { name: req.body.name, completed: req.body.completed };
    collection.insert(tournament, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/tournament/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('tournaments').findOne(details, (err, tournament) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(tournament);
      }
    });
  });

  app.put('/tournament/:id', (req, res) => {
   const id = req.params.id;
   const details = { '_id': new ObjectID(id) };
   const collection = db.get('tournaments');
   const tournament = { name: req.body.name, completed: req.body.completed };
   collection.update(details, tournament, (err, result) => {
     if (err) {
         res.send({'error':'An error has occurred'});
     } else {
         res.send(tournament);
     }
   });
 });

 app.delete('/tournament/:id', (req, res) => {
   const id = req.params.id;
   const details = { '_id': new ObjectID(id) };
   const collection = db.get('tournaments');
   collection.remove(details, (err, tournament) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Tournament deleted!');
      }
    });
  });
};
