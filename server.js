const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());

const authRoutes = require('./models/authentification.models.js');
app.use('/auth', authRoutes);
// declaration du dossier static


// Define a route
require('./routes/privileges.routes')(app);
require('./routes/cms_users.routes')(app);
require('./routes/depots_routes.js')(app);
require('./routes/client_routes.js')(app);
require('./routes/groupe_client_models.js')(app);
require('./routes/sections_routes.js')(app);
require('./routes/type_commande.routes.js')(app);
require('./routes/statuscommandes_routes.js')(app);
require('./routes/ligneCommande_routes.js')(app);


// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
