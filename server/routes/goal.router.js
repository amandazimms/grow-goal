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
  // console.log('>>>> in goal router, req.params:', req.params);
  // console.log('>>>> in goal router, req.body:', req.body);
  // console.log('>>>> in goal router, req.query:', req.query);

  //req.query.userId is user id
  const queryString = `SELECT * FROM "goal" 
      WHERE "user_id"=${req.query.userId}  
      ORDER BY id`;
  
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

router.put('/name/:id', (req, res) => {
  // console.log('>>>> in goal router, req.params:', req.params);
  // console.log('>>>> in goal router, req.body:', req.body);
  // console.log('>>>> in goal router, req.query:', req.query);

  const queryString = `UPDATE "goal" SET 
        goal_name=$1 
        WHERE id=${req.params.id}`;
  values = [req.body.goal_name];

  pool.query(queryString, values)
    .then((results)=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('PUT goal name failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/visibility/:id', (req, res) => {
  // console.log('>>>> in goal visibility router, req.params:', req.params);
  // console.log('>>>> in goal visibility router, req.body:', req.body);
  // console.log('>>>> in goal visibility router, req.query:', req.query);

  const queryString = `UPDATE "goal" SET 
        visibility=$1 
        WHERE id=${req.params.id}`;
  values = [req.body.visibility];

  pool.query(queryString, values)
    .then((results)=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('PUT goal visibility failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/like_count/:id', (req, res) => {
  // console.log('>>>> in goal like count router, req.params:', req.params);
  // console.log('>>>> in goal like count router, req.body:', req.body);
  // console.log('>>>> in goal like count router, req.query:', req.query);

  //req.params.id is goal id
  //req.body.direction is "increment" or "decrement"
  let incOrDecString = 'like_count + 1';
  if (req.body.direction === "decrement"){
    incOrDecString = 'like_count - 1';
  }

  const queryString = `UPDATE "goal" SET 
        like_count=${incOrDecString} 
        WHERE id=${req.params.id}`;

  pool.query(queryString)
    .then((results)=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('PUT goal visibility failed: ', err);
      res.sendStatus(500);
    });
});


router.put('/progress/:id', (req, res) => {
  // console.log('>>>> in goal progress router, req.params:', req.params);
  // console.log('>>>> in goal progress router, req.body:', req.body);
  // console.log('>>>> in goal progress router, req.query:', req.query);

  //req.params.id is the goal id
  //req.body.progress is the goal progress percentage
  //req.body.current_image_path is image path's url
  const queryString = `UPDATE "goal" SET 
        "progress"=$1,
        "current_avatar_path"=$2 
        WHERE id=${req.params.id}`;
  values = [req.body.progress, req.body.current_image_path];

  pool.query(queryString, values)
    .then((results)=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('PUT goal failed: ', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req,res)=> {
  const queryString = `DELETE FROM "goal" WHERE id=${req.params.id}`;

  pool.query(queryString)
    .then(()=>{
      res.sendStatus(200);
    }).catch((err) => {
      console.log('DELETE goal failed: ', err);
      res.sendStatus(500);
    });
})


module.exports = router;
