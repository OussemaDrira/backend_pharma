module.exports = (app) => {
    const db = require('../models/client_models.js')

    app.get('/clients', db.getclient);
    app.post('/clients',db.createclient);
  
    
} 