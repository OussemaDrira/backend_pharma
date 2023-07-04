const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());

const authRoutes = require('./models/authentification.models.js');
app.use('/auth', authRoutes);

// Define a route
require('./routes/privileges.routes')(app);
require('./routes/cms_users.routes')(app);
// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});