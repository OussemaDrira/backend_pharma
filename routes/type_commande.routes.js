module.exports = (app) => {
    const db = require('../models/type_commande.js')

    app.get('/typecommandes', db.getTypeCommandes);
    app.post('/typecommandes',db.createtype_commande);
    app.put('/typecommandes/:id',db.updatetype_commande);
    app.delete('/typecommandes/:id',db.deleatetypecommande);
  
}