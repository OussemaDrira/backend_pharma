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
const getPrivileges = (request, response) => {
    pool.query('SELECT * FROM cms_privileges ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const updatePrivilage = (request, response) => {
    const id = parseInt(request.params.id)

    const { name, is_superadmin, theme_color } = request.body;
    const updated_at = new Date(); // Get the current date and time
  
    pool.query(
      'UPDATE cms_privileges SET name = $1, is_superadmin = $2 ,theme_color = $3, updated_at = $4 WHERE id = $5',
      [name, is_superadmin, theme_color, updated_at,id],
      (error, results) => {
        if (error) {
          throw error;
        }
       
        response.status(201).send(`Privilege updated with ID: ${id}`);
      }
    );
  };
  
  const createPrivilage = (request, response) => {
    const { name, is_superadmin, theme_color } = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO cms_privileges (name, is_superadmin, theme_color, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, is_superadmin, theme_color, created_at],
      (error, results) => {
        if (error) {
          throw error;
        }
        const privilegeId = results.rows[0].id;
        response.status(201).send(`Privilege added with ID: ${privilegeId}`);
      }
    );
  };
  const deletePrivileges = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM cms_privileges WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Privilege deleted with ID: ${id}`)
    })
  };
  
  module.exports = {
    getPrivileges,
    createPrivilage,
    updatePrivilage,
    deletePrivileges

  }
