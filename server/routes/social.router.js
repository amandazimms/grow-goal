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

router.get('/followees', (req,res) => {
  // console.log('--->in social followee router get. req.query:', req.query);
  // console.log('--->in social followee router get. req.body:', req.body);
  // console.log('--->in social followee router get. req.params:', req.params);
  
  //req.query.follower_id is id of the currently logged in user (follower)
  const queryString = `SELECT username, image_path, "user".id 
          FROM "followers" 
          JOIN "user" ON "user".id=followee_id 
          JOIN "profile_avatar" ON profile_avatar.id="user".profile_avatar_id 
          WHERE follower_id=${req.query.follower_id};`
  
  pool.query(queryString).then((results)=>{
    res.send(results.rows);
  }).catch((err)=>{
    console.log('error with followees GET:', err);
    res.sendStatus(500);
  })
})

router.get('/search', (req,res) => {
  // console.log('--->in social followee SEARCH router get. req.query:', req.query);
  // console.log('--->in social followee SEARCH router get. req.body:', req.body);
  // console.log('--->in social followee SEARCH router get. req.params:', req.params);
  
  //req.query.search_text is search text
  //req.query.follower_id is the follower's id
  const queryString =  `SELECT username, image_path, "user".id  
      FROM "user" 
      JOIN "profile_avatar" ON profile_avatar.id="user".profile_avatar_id 
      WHERE "username" ILIKE '%${req.query.search_text}%';`
  
  pool.query(queryString).then((results)=>{
    res.send(results.rows);

  }).catch((err)=>{
    console.log('error with search followees GET:', err);
    res.sendStatus(500);
  })
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
              AND followee_id=${req.query.followee_id}
              ORDER BY goal_id;`
  
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


module.exports = router;
