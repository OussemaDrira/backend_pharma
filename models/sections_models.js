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
const getSections = (request, response) => {
    pool.query('SELECT * FROM sections ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };
  // const createSection = (request, response) => {
  //   const { libelle, id_depot, updated_at,deleted_at,code,code_depot } = request.body;
  //   const created_at = new Date(); // Get the current date and time
  //      console.log(libelle);

  //   pool.query(
  //     'INSERT INTO sections( libelle, id_depot, updated_at,deleted_at,code,code_depot) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
  //     [ libelle, id_depot, updated_at,deleted_at,code,code_depot],
      
  //     (error, results) => {
  //       console.log(libelle);
  //       if (error) {
  //         throw error;
  //       }
  //       const sectionId = results.rows[0].id;
  //       response.status(201).send(`Sections added with ID: ${sectionId}`);
  //     }
  //   );
  // };
  module.exports={
    getSections
    // createSection
    
  }