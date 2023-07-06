module.exports = (app) => {
    const db = require('../models/ligneCommande_models.js')

    app.get('/lignescommandes', db.getlignes);
  
  
}