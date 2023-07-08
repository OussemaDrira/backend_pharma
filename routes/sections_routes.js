module.exports = (app) => {
    const db = require('../models/sections_models.js')

    app.get('/sections', db.getSections);
    app.post('/sections',db.createSection);
    app.put('/sections/:id',db.updatesections);
    // app.delete('/depots/:id',db.deletedepot);
  
}