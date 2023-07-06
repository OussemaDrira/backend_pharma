// const express = require('express');
// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'medicale',
//   password: 'drira123',
//   port: 5432,
// })
// module.exports=pool ;
// const multer=require ('multer');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
        
//         cb(null,"pool");
//     },
//     filename: (req, file, cb) => {
//        const fileName = file.originalname.toLowerCase().split(' ').join('-');
//        console.log("name  : ",fileName)
//        cb(null, fileName)
       
//     }
// });
// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         console.log("type imageUrl : ",file.mimetype)
//             cb(null, true);
     
//     }
  
// });

module.exports = (app) => {

    const db = require('../models/cms_users.models.js')

    app.get('/cms_users', db.getUsers);
    app.delete('/cms_users/:id',db.deleteUsers);
   // app.put('/cms_users/:id',db.update);

    
} 