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
const getdepots = (request, response) => {
    pool.query('SELECT * FROM depots ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };
  const createdepot = (request, response) => {
    const { lib_depot,cdeParCalendrier,updated_at,deleted_at,couleur,textcouleur,code } = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO depots (lib_depot, cdeParCalendrier, created_at, updated_at, deleted_at, couleur, textcouleur, code) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING id',
      [lib_depot, cdeParCalendrier, created_at, updated_at, deleted_at, couleur, textcouleur, code],
      (error, results) => {
        if (error) {
          throw error;
        }
        const depotId = results.rows[0].id;
        response.status(201).send(`depot added with ID: ${depotId}`);
      }
    );
  };
  const deletedepot = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM depots WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`depots deleted with ID: ${id}`)
    })
  };
  module.exports={
    getdepots,
    createdepot,
    deletedepot
  }