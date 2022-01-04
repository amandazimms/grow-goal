const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/all', (req,res) => {
  // console.log('*** in pa router GET all. req.query:', req.query);
  // console.log('*** in pa router GET all. req.body:', req.body);
  // console.log('*** in pa router GET all. req.params:', req.params);
   
  //req.query.table is the name of the table, e.g. 'profile_avatar_hat'
  const queryString = `SELECT * FROM ${req.query.table}
      ORDER BY id;`
  
  pool.query(queryString).then((results)=>{
    res.send(results.rows);

  }).catch((err)=>{
    console.log('error with plant_avatar GET:', err);
    res.sendStatus(500);
  })
})

// router.put('/:id', (req, res) => {
//   // console.log('*** in pa router PUT. req.query:', req.query);
//   // console.log('*** in pa router PUT. req.body:', req.body);
//   // console.log('*** in pa router PUT. req.params:', req.params);

//   // req.body.plant_avatar_id is our plant avatar id
//   // req.params.id is our goal id

//   const queryString = `UPDATE "goal" SET 
//       plant_avatar_id=$1 
//       WHERE id=${req.params.id} 
//       RETURNING "progress"`;

//   values = [req.body.plant_avatar_id];

//   pool.query(queryString, values)
//     .then((results)=>{
//       res.send(results.rows[0])

//     }).catch((err) => {
//       console.log('PUT task failed: ', err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
