const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
//todo do we need a goal strategy?

const router = express.Router();

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.get('/', (req,res) => {
  const queryString = `SELECT * FROM "goal"`;
  
  pool.query(queryString).then((results)=>{
    res.send(results.rows);
  }).catch((err)=>{
    console.log('error with goals GET:', err);
    res.sendStatus(500);
  })
})

router.post('/', (req, res) => {
  const queryString = `INSERT INTO "goal" ("goal_name", "progress", "is_accomplished", "user_id", "plant_avatar_id")
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    values = [req.body.goal_name, 
              req.body.progress, 
              req.body.is_accomplished, 
              req.body.user_id, 
              req.body.plant_avatar_id];
  
    pool.query(queryString, values)
    .then((results)=>{
      res.send(results.rows[0]);
      //since we asked for RETURNING id, rows [0].id will be the id for the entry we just made

    }).catch((err) => {
      console.log('POST goal failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
  //todo this is incomplete and only updates the name:
  const queryString = `UPDATE "goal" SET goal_name=$1 WHERE id=$2`;
    values = [req.query.goalName, req.query.id];

  pool.query(queryString, value)
    .then((results)=>{
      res.sendStatus(200);
    }).catch((err) => {
      console.log('PUT goal failed: ', err);
      res.sendStatus(500);
    });
});

router.delete('/', (req,res)=> {
  const queryString = `DELETE FROM "goal" WHERE id=$1`;
  values = [req.params.id];

  pool.query(queryString, value)
    .then((results)=>{
      res.sendStatus(200);
    }).catch((err) => {
      console.log('DELETE goal failed: ', err);
      res.sendStatus(500);
    });
})


module.exports = router;
