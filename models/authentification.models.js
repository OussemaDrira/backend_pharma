const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medicale',
  password: 'drira123',
  port: 5432,
})
module.exports = pool;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
var {PASSWRD_REGEX, EMAIL_REGEX } = require("../db/handler.config")

router.post('/register', async (req, res) => {

    try {
      const {name,photo,email,password,id_cms_privileges ,updated_at,status,login,code,id_depot,adminclient,device_key,code_depot,is_valid,test_password,old_password,remember_token,access_token,last_connected} = req.body;
      const created_at = new Date(); // Get the current date and time
      if (!EMAIL_REGEX.test(email)) {
        return res.status(401).json({ 'erreur': 'Email non valide' });
    }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Store the user in the database
      await pool.query('INSERT INTO cms_users (name, photo, email, password, id_cms_privileges, created_at, updated_at, status, login, code, id_depot, adminclient, device_key, code_depot, is_valid, test_password, old_password, remember_token, access_token, last_connected) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)', 
      [name,photo,email,hashedPassword,id_cms_privileges ,created_at,updated_at,status,login,code,id_depot,adminclient,device_key,code_depot,is_valid,test_password,old_password,remember_token,access_token,last_connected]);
  
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  // User login
  router.post('/login', async (req, res) => {
    try {
      const { login, password } = req.body;
  
      // Retrieve the user from the database
      const result = await pool.query('SELECT * FROM cms_users WHERE login = $1', [login]);
      const user = result.rows[0];
  
      // Check if the user exists and verify the password
      if (!user || !(await bcrypt.compare(password, user.password))) {
        
        res.status(401).json({ error: 'Invalid username or password' });
      } else {
        // Generate a JWT
        const token = jwt.sign({ userId: user.id }, 'your_secret_key');
  
        res.status(200).json({ token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = router;
  
  