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
  // probleme de cdeParCalendrier lors de l'insertion a la base de donnes 
  const createdepot = (request, response) => {
    const { lib_depot,updated_at,deleted_at,couleur,textcouleur,code,cdcal } = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO depots ( lib_depot, created_at, couleur, textcouleur, code, cdcal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [lib_depot, created_at , couleur, textcouleur, code, cdcal],
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
  const updatedepots = (request, response) => {
    const id = parseInt(request.params.id)

    const { lib_depot,deleted_at,couleur,textcouleur,code,cdcal } = request.body;
    const updated_at = new Date(); // Get the current date and time
  
    pool.query(
      'UPDATE depots SET lib_depot = $1, updated_at = $2 ,couleur = $3, textcouleur = $4, code= $5, cdcal=$6 WHERE id = $7',
      [lib_depot, updated_at , couleur, textcouleur, code, cdcal,id],
      (error, results) => {
        if (error) {
          throw error;
        }
       
        response.status(201).send(`depots updated with ID: ${id}`);
      }
    );
  };
  module.exports={
    getdepots,
     createdepot,
    deletedepot,
    updatedepots
  }