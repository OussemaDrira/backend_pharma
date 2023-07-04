module.exports = (app) => {
    const db = require('../models/cms_users.models.js')

    app.get('/cms_users', db.getUsers);
    app.delete('/cms_users/:id',db.deleteUsers);
    
} 