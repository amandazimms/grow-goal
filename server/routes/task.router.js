const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
//todo do we need a task strategy?

const router = express.Router();

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.get('/', (req,res) => {
  // console.log('--->in task router get. req.query:', req.query);
  // console.log('--->in task router get. req.body:', req.body);
  // console.log('--->in task router get. req.params:', req.params);

  const queryString = `SELECT * FROM task WHERE goal_id=${req.query.id} ORDER BY id`;

  pool.query(queryString).then((results)=>{
    res.send(results.rows);
  }).catch((err)=>{
    console.log('error with tasks GET:', err);
    res.sendStatus(500);
  })
})

router.post('/', (req, res) => {
  const queryString = `INSERT INTO "task" (task_name, is_complete, goal_id)
    VALUES ($1, $2, $3)`;
    values = [req.body.task_name, req.body.is_complete, req.body.goal_id];
  
    pool.query(queryString, values)
    .then((results)=>{
      res.sendStatus(200);
    }).catch((err) => {
      console.log('POST task failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  // console.log('*** in task router PUT. req.query:', req.query);
  // console.log('*** in task router PUT. req.body:', req.body);
  // console.log('*** in task router PUT. req.params:', req.params);

  const queryString = `UPDATE "task" SET 
      task_name=$1,
      is_complete=$2
      WHERE id=${req.params.id}`;
  values = [req.body.task_name, req.body.is_complete];

  pool.query(queryString, values)
    .then(()=>{
      res.sendStatus(200);
      // console.log('--->results.rows:', results.rows);
      // res.send(results.rows);

    }).catch((err) => {
      console.log('PUT task failed: ', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req,res)=> {
  const queryString = `DELETE FROM "task" WHERE id=${req.params.id}`;

  pool.query(queryString)
    .then(()=>{
      res.sendStatus(200);
    }).catch((err) => {
      console.log('DELETE task failed: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
