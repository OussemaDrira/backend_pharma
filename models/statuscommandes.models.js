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
const getstatuts = (request, response) => {
    pool.query('SELECT * FROM statuscommandes ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };
  const createStatuts = (request, response) => {
    const { lib_statcmd, updated_at, deleted_at } = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO statuscommandes (lib_statcmd, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4) RETURNING id',
      [lib_statcmd, created_at, updated_at, deleted_at],
      (error, results) => {
        if (error) {
          throw error;
        }
        const statusId = results.rows[0].id;
        response.status(201).send(`Privilege added with ID: ${statusId}`);
      }
    );
  };
  const updatestatuts = (request, response) => {
    const id = parseInt(request.params.id)

    const { lib_statcmd,deleted_at } = request.body;
    const updated_at = new Date(); // Get the current date and time
  
    pool.query(
      'UPDATE statuscommandes SET lib_statcmd = $1, deleted_at = $2 ,updated_at = $3 WHERE id = $4',
      [lib_statcmd,deleted_at, updated_at,id],
      (error, results) => {
        if (error) {
          throw error;
        }
       
        response.status(201).send(`statuts updated with ID: ${id}`);
      }
    );
  };
  const deletesatatuts = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM statuscommandes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`satatus deleted with ID: ${id}`)
    })
  }
  module.exports={
    getstatuts,
    createStatuts,
    updatestatuts,
    deletesatatuts
  }