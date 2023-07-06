module.exports = (app) => {
    const db = require('../models/type_commande.js')

    app.get('/typecommandes', db.getTypeCommandes);
  
  
}