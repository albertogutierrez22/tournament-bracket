const tournamentRoutes = require('./tournamentRoutes');

module.exports = function(app, db) {
  tournamentRoutes(app, db);
}
