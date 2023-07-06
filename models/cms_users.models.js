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
  };
  // const multer=require ('multer');
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads/');
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + '-' + file.originalname);
  //   },
  // });
  // const upload = multer({ storage: storage });
  // const update= async (req, res) => {
   
  //     const id = parseInt(req.params.id);
  //     // const { filename, path } = req.file;
  //     const{photo}=req.body;
  
  //     // Insert the image details into the PostgreSQL database
  //     pool.query(
  //           'UPDATE cms_users SET photo = $1 WHERE id = $2',
  //           [photo,id],
  //           (error, results) => {
  //             if (error) {
  //               throw error;
  //             }
             
  //             res.status(201).send(`photo updated with ID: ${id}`);
  //           }
  //         );
  // };
  

  // const update= async(req , res)=>{
  //   const url = req.get('host') ;
    
  //   const id = parseInt(req.params.id);
  //   const {photo}= req.file.filename; 
   
  //   pool.query(
  //     'UPDATE cms_users SET photo = $1 WHERE id = $2',
  //     [photo,id],
  //     (error, results) => {
  //       if (error) {
  //         throw error;
  //       }
       
  //       res.status(201).send(`photo updated with ID: ${id}`);
  //     }
  //   );
    
    
  //   };
  

  module.exports ={
    getUsers,
    deleteUsers
   // update
    
  };