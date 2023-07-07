module.exports = (app) => {
    const db = require('../models/groupe_clients_models.js')

    app.get('/groupeclts', db.getGroupClients);
    app.post('/groupeclts', db.cretegroupClients);
    app.delete('/groupeclts/:id', db.deletegrouClients);     
    

  
    
} 