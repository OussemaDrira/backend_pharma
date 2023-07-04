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
const getclient = (request, response) => {
    pool.query('SELECT * FROM clients ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };
  const createclient = (request, response) => {
    const { codeclient, typeclient, nom,actif,blkimp,id_depot,updated_at,deleted_at,id_user,code_depot } = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO clients (codeclient, typeclient, nom,actif,blkimp,id_depot,created_at,updated_at,deleted_at,id_user,code_depot ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
      [codeclient, typeclient, nom,actif,blkimp,id_depot,created_at,updated_at,deleted_at,id_user,code_depot ],
      (error, results) => {
        if (error) {
          throw error;
        }
        const clientId = results.rows[0].id;
        response.status(201).send(`clients added with ID: ${clientId}`);
      }
    );
  };
  const delateclient = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM clients WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`clients deleted with ID: ${id}`)
    })
  }

  module.exports={
    getclient,
    createclient,
    delateclient
  }