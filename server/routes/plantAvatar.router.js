const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
//todo do we need a plantAvatar strategy?

const router = express.Router();

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.get('/', (req,res) => {
  // console.log('--->in plantAvatar router get. req.query:', req.query);
  // console.log('--->in plantAvatar router get. req.body:', req.body);
  // console.log('--->in plantAvatar router get. req.params:', req.params);
  const queryString = `SELECT
          goal.id AS goal_id, 
          plant_avatar.id AS plant_avatar_id, 
          goal_name, progress, is_accomplished, user_id, 
          image_path_stage_1, image_path_stage_2, image_path_stage_3, image_path_stage_4,
          image_path_stage_5, image_path_stage_6, image_path_stage_7, image_path_stage_8 
      FROM "goal"
      JOIN "plant_avatar" ON goal.plant_avatar_id=plant_avatar.id 
      WHERE goal.id=${req.query.id};`
  
  pool.query(queryString).then((results)=>{
    res.send(results.rows);

  }).catch((err)=>{
    console.log('error with plant_avatar GET:', err);
    res.sendStatus(500);
  })
})

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

module.exports = router;
