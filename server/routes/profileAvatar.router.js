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

router.put('/:id', (req, res) => {
  // console.log('*** in pa router PUT. req.query:', req.query);
  // console.log('*** in pa router PUT. req.body:', req.body);
  // console.log('*** in pa router PUT. req.params:', req.params);

  // req.body.profile_avatar is the object with all properties and paths
  //   e.g. req.body.profile_avatar.hat is 9
  // req.params.id is our userId
  const queryString = `UPDATE "user" SET 
      profile_avatar_hat_id=${req.body.profile_avatar.hat},
      profile_avatar_hair_id=${req.body.profile_avatar.hair},
      profile_avatar_eyebrows_id=${req.body.profile_avatar.eyebrows},
      profile_avatar_eyes_id=${req.body.profile_avatar.eyes},
      profile_avatar_nose_id=${req.body.profile_avatar.nose},
      profile_avatar_detail_id=${req.body.profile_avatar.details},
      profile_avatar_mouth_id=${req.body.profile_avatar.mouth},
      profile_avatar_head_id=${req.body.profile_avatar.head},
      profile_avatar_body_id=${req.body.profile_avatar.body}
      WHERE id=${req.params.id}`;

  pool.query(queryString)
    .then(()=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('PUT profile image failed: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
