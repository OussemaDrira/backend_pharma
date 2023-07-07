module.exports = (app) => {
    const db = require('../models/statuscommandes.models.js')

    app.get('/statuscommandes', db.getstatuts);
    app.post('/statuscommandes',db.createStatuts);
    app.put('/statuscommandes/:id', db.updatestatuts);
    app.delete('/statuscommandes/:id',db.deletesatatuts);
  
}