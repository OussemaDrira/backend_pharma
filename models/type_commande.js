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
const getTypeCommandes = (request, response) => {
    pool.query('SELECT * FROM typecommandes ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };
  const createtype_commande = (request, response) => {
    const { lib_typcmd,updated_at,deleted_at } = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO typecommandes (lib_typcmd, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4) RETURNING id',
      [lib_typcmd, created_at, updated_at, deleted_at],
      (error, results) => {
        if (error) {
          throw error;
        }
        const typecommandeId = results.rows[0].id;
        response.status(201).send(`typeCommande added with ID: ${typecommandeId}`);
      }
    );
  };
  const updatetype_commande = (request, response) => {
    const id = parseInt(request.params.id)

    const { lib_typcmd,deleted_at } = request.body;
    const updated_at = new Date(); // Get the current date and time
  
    pool.query(
      'UPDATE typecommandes SET lib_typcmd = $1, updated_at = $2 ,deleted_at = $3 WHERE id = $4',
      [lib_typcmd, updated_at, deleted_at,id],
      (error, results) => {
        if (error) {
          throw error;
        }
       
        response.status(201).send(`type_commande  updated with ID: ${id}`);
      }
    );
  };
  const deleatetypecommande = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM typecommandes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`typeCommande deleted with ID: ${id}`)
    })
  };
  module.exports={
    getTypeCommandes,
    createtype_commande,
    updatetype_commande,
    deleatetypecommande
};

  