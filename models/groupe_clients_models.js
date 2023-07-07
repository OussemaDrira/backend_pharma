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
const getGroupClients = (request, response) => {
    pool.query('SELECT * FROM groupeclts ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };
  const cretegroupClients = (request, response) => {
    const { annee, updated_at, deleted_at,id_depot,id_client } = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO groupeclts (annee, created_at, updated_at, deleted_at, id_depot ,id_client) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [annee, created_at, updated_at, deleted_at, id_depot ,id_client],
      (error, results) => {
        if (error) {
          throw error;
        }
        const groupeClientsId = results.rows[0].id;
        response.status(201).send(`groupe clients added with ID: ${groupeClientsId}`);
      }
    );
  };
  const deletegrouClients = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('DELETE FROM groupeclts WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`groupe client deleted with ID: ${id}`)
    })
  };
  module.exports ={
    getGroupClients,
    cretegroupClients,
    deletegrouClients
  }