const express = require('express');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medicale',
  password: 'drira123',
  port: 5432,
})
module.exports=pool ;
const getUsers = (request, response) => {
    pool.query('SELECT * FROM cms_users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };
  const deleteUsers = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM cms_users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`user deleted with ID: ${id}`)
    })
  }
  

  module.exports ={
    getUsers,
    deleteUsers
  };