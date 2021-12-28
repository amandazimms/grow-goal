const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.get('/follower_like_status', (req,res) => {
  // console.log('--->in social f.like.s router get. req.query:', req.query);
  // console.log('--->in social f.like.s router get. req.body:', req.body);
  // console.log('--->in social f.like.s router get. req.params:', req.params);
  
  //req.query.goal_id a goal IDs.
  //req.query.follower_id is the follower's id.
  const queryString = `SELECT * FROM "likes"
      WHERE "goal_id"=${req.query.goal_id} AND "liked_by"=${req.query.follower_id};`
    
    pool.query(queryString).then((results)=>{
      res.send(results.rows);

    }).catch((err)=>{
      console.log('error with likes GET:', err);
      res.sendStatus(500);
    })
})

router.post('/follower_like', (req,res) => {
  // console.log('*** in follower-like router PUT. req.query:', req.query);
  // console.log('*** in follower-like router PUT. req.body:', req.body);
  // console.log('*** in follower-like router PUT. req.params:', req.params);

  //req.body.goal_id is goal id
  //req.body.follower_id is follower id
  const queryString = `INSERT INTO "likes" (goal_id, liked_by)
      VALUES ($1, $2);`;

  values = [req.body.goal_id, req.body.follower_id];

  pool.query(queryString, values)
    .then(()=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('PUT task failed: ', err);
      res.sendStatus(500);
    });
})

router.delete('/follower_like', (req,res) => {
  // console.log('*** in follower-like router DELETE. req.query:', req.query);
  // console.log('*** in follower-like router DELETE. req.body:', req.body);
  // console.log('*** in follower-like router DELETE. req.params:', req.params);

  //req.query.goal_id is the goal id
  //req.query.follower_id is the follower id
  const queryString = `DELETE FROM "likes" WHERE 
          goal_id=$1 AND
          liked_by=$2;`;
  values = [req.query.goal_id, req.query.follower_id];

  pool.query(queryString, values)
    .then(()=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('DELETE like failed: ', err);
      res.sendStatus(500);
    });
})

router.get('/like_count', (req,res) => {
  //TODO not used in current setup 

  // console.log('--->in social like router get. req.query:', req.query);
  // console.log('--->in social like router get. req.body:', req.body);
  // console.log('--->in social like router get. req.params:', req.params);
  
  // //req.query.goal_id is the id of the current goal
  // const queryString = `SELECT COUNT(liked_by) FROM
  //     "likes" WHERE "goal_id"=${req.query.goal_id};`
  
  // pool.query(queryString).then((results)=>{
  //   console.log('results:', results.rows[0]);
  //   res.send(results.rows[0]);

  // }).catch((err)=>{
  //   console.log('error with likes GET:', err);
  //   res.sendStatus(500);
  // })
})

router.get('/followees', (req,res) => {
  // console.log('--->in social followee router get. req.query:', req.query);
  // console.log('--->in social followee router get. req.body:', req.body);
  // console.log('--->in social followee router get. req.params:', req.params);
  
  //req.query.follower_id is id of the currently logged in user (follower)
  const queryString = `SELECT username, profile_avatar_path, "user".id FROM 
        "followers" JOIN "user" ON "user".id=followee_id
        WHERE follower_id=${req.query.follower_id};`
  
  pool.query(queryString).then((results)=>{
    res.send(results.rows);
  }).catch((err)=>{
    console.log('error with followees GET:', err);
    res.sendStatus(500);
  })
})

router.get('/followee_id', (req, res) => {
  //getting the ID of a user (followee) that the logged in user (followee) desires to follow
  //(since users won't know other users' ids.)

  // console.log('--->in social followee ID router get. req.query:', req.query);
  // console.log('--->in social followee ID router get. req.body:', req.body);
  // console.log('--->in social followee ID router get. req.params:', req.params);

  //req.query.followee_username is the username of the followee (to be followed)
    const queryString = `SELECT "user".id FROM "user" WHERE "username"='${req.query.followee_username}';`

    pool.query(queryString)
    .then((results)=>{
      //send back the ID of that user
      res.send(results.rows[0]);
    }).catch((err) => {
      console.log('GET followee_id failed: ', err);
      res.sendStatus(500);
    });
})

router.get('/followee_goals', (req, res) => {
  // console.log('--->in social followee goals router get. req.query:', req.query);
  // console.log('--->in social followee goals router get. req.body:', req.body);
  // console.log('--->in social followee goals router get. req.params:', req.params);

  //req.query.followee_id is the id of the followee (user that was clicked on)
  //req.query.follower_id is the id of the follower (logged in user)
  const queryString = `SELECT followee_id, "goal".id AS "goal_id", goal_name, like_count, current_avatar_path FROM 
           "followers" JOIN "goal" ON followee_id=goal.user_id 
           WHERE goal.visibility='followers' 
              AND follower_id=${req.query.follower_id} 
              AND followee_id=${req.query.followee_id};`
  
  pool.query(queryString)
    .then((results)=>{
      //console.log('***results.rows:', results.rows);
      res.send(results.rows);
    }).catch((err) => {
      console.log('GET followee goals failed: ', err);
      res.sendStatus(500);
    });
})

router.post('/followee', (req, res) => {
  // console.log('--->in social followee router post. req.query:', req.query);
  // console.log('--->in social followee router post. req.body:', req.body);
  // console.log('--->in social followee router post. req.params:', req.params);

  //req.body.followee_id is the followee id
  //req.body.follower_id is the follower id
  const queryString = `INSERT INTO "followers" (followee_id, follower_id)
    VALUES ($1, $2)`;
    values = [req.body.followee_id, req.body.follower_id];
  
    pool.query(queryString, values)
    .then((results)=>{
      res.sendStatus(200);
    }).catch((err) => {
      console.log('POST followee failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  // console.log('*** in task router PUT. req.query:', req.query);
  // console.log('*** in task router PUT. req.body:', req.body);
  // console.log('*** in task router PUT. req.params:', req.params);

  // const queryString = `UPDATE "task" SET 
  //     task_name=$1,
  //     is_complete=$2
  //     WHERE id=${req.params.id}`;
  // values = [req.body.task_name, req.body.is_complete];

  // pool.query(queryString, values)
  //   .then(()=>{
  //     res.sendStatus(200);
  //     // console.log('--->results.rows:', results.rows);
  //     // res.send(results.rows);

  //   }).catch((err) => {
  //     console.log('PUT task failed: ', err);
  //     res.sendStatus(500);
  //   });
});

router.delete('/singleTask/:id', (req,res)=> {
  // const queryString = `DELETE FROM "task" WHERE id=${req.params.id}`;

  // pool.query(queryString)
  //   .then(()=>{
  //     res.sendStatus(200);
  //   }).catch((err) => {
  //     console.log('DELETE task failed: ', err);
  //     res.sendStatus(500);
  //   });
});

//console.log("!!!");

router.delete('/thisGoalsTasks/:id', (req,res)=> {
  // console.log('*** in task router DELETE (this goals tasks). req.query:', req.query);
  // console.log('*** in task router DELETE (this goals tasks). req.body:', req.body);
  // console.log('*** in task router DELETE (this goals tasks). req.params:', req.params);

  //req.params.id is the goal's id - delete all tasks where this is the goal_id.
  // const queryString = `DELETE FROM "task" WHERE goal_id=${req.params.id}`;

  // pool.query(queryString)
  //   .then(()=>{
  //     res.sendStatus(200);
  //   }).catch((err) => {
  //     console.log('DELETE task failed: ', err);
  //     res.sendStatus(500);
  //   });
});

module.exports = router;
