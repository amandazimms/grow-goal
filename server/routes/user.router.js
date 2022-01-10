const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});


//todo move this to profileAvatar router
router.get('/profile_avatar', (req,res) => {
  //req.query.user_id is user id
  // const queryString = `SELECT image_path 
  //       FROM "user" 
  //       JOIN "profile_avatar" ON profile_avatar.id="user".profile_avatar_id 
  //       WHERE "user".id=${req.query.user_id};`

  const queryString = `SELECT 
            profile_avatar_hat.image_path AS hat_image_path,
            profile_avatar_hair.image_path AS hair_image_path,
            profile_avatar_eyebrows.image_path AS eyebrows_image_path,
            profile_avatar_eyes.image_path AS eyes_image_path,
            profile_avatar_nose.image_path AS nose_image_path,
            profile_avatar_detail.image_path AS detail_image_path,
            profile_avatar_mouth.image_path AS mouth_image_path,
            profile_avatar_head.image_path AS head_image_path,
            profile_avatar_body.image_path AS body_image_path

            FROM "user"
            
            JOIN profile_avatar_hat ON profile_avatar_hat.id="user".profile_avatar_hat_id
            JOIN profile_avatar_hair ON profile_avatar_hair.id="user".profile_avatar_hair_id
            JOIN profile_avatar_eyebrows ON profile_avatar_eyebrows.id="user".profile_avatar_eyebrows_id
            JOIN profile_avatar_eyes ON profile_avatar_eyes.id="user".profile_avatar_eyes_id
            JOIN profile_avatar_nose ON profile_avatar_nose.id="user".profile_avatar_nose_id
            JOIN profile_avatar_detail ON profile_avatar_detail.id="user".profile_avatar_detail_id
            JOIN profile_avatar_mouth ON profile_avatar_mouth.id="user".profile_avatar_mouth_id
            JOIN profile_avatar_head ON profile_avatar_head.id="user".profile_avatar_head_id
            JOIN profile_avatar_body ON profile_avatar_body.id="user".profile_avatar_body_id

            WHERE "user".id=${req.query.user_id}`;
  
  pool.query(queryString).then((results)=>{
    res.send(results.rows);

  }).catch((err)=>{
    console.log('error with profile avatar GET:', err);
    res.sendStatus(500);
  })
})

router.put('/goal_count/:id', (req, res) => {
  // console.log('>>>> in user router goal count, req.params:', req.params);
  // console.log('>>>> in user router goal count, req.body:', req.body);
  // console.log('>>>> in user router goal count, req.query:', req.query);

  //req.params.id is user id
  //req.body.goals_achieved is the new count for completed goals
  const queryString = `UPDATE "user" SET 
        goals_achieved=${req.body.goals_achieved} 
        WHERE id=${req.params.id}`;

  pool.query(queryString)
    .then((results)=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('PUT user goals_achieved count failed: ', err);
      res.sendStatus(500);

   });
})

router.put('/task_count/:id', (req, res) => {
  // console.log('>>>> in user task count router, req.params:', req.params);
  // console.log('>>>> in user task count router, req.body:', req.body);
  // console.log('>>>> in user task count router, req.query:', req.query);

  //req.params.id is user id
  //req.body.is_complete is true (for ++) or false (for --)
  let incOrDecString = 'tasks_completed + 1';
  if (!req.body.is_complete){
    incOrDecString = 'tasks_completed - 1';
  }

  const queryString = `UPDATE "user" SET 
        tasks_completed=${incOrDecString} 
        WHERE id=${req.params.id}`;

  pool.query(queryString)
    .then((results)=>{
      res.sendStatus(200);

    }).catch((err) => {
      console.log('PUT user tasks_completed count failed: ', err);
      res.sendStatus(500);

    });
})


// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
