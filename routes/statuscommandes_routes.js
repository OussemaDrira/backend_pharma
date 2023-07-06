module.exports = (app) => {
    const db = require('../models/statuscommandes.models.js')

    app.get('/statuscommandes', db.getstatuts);
  
  
}