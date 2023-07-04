module.exports = (app) => {
    const db = require('../models/privileges.models.js')

    app.get('/cms_privileges', db.getPrivileges);
    app.post('/cms_privileges', db.createPrivilage);
    app.put('/cms_privileges/:id', db.updatePrivilage);
    app.delete('/cms_privileges/:id', db.deletePrivileges);     
    
} 