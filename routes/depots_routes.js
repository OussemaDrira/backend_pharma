module.exports = (app) => {
    const db = require('../models/depot_models.js')

    app.get('/depots', db.getdepots);
    app.post('/depots',db.createdepot);
    app.delete('/depots/:id',db.deletedepot);
  
}