import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* plantAvatarsSaga() {
  yield takeLatest('FETCH_PLANT_AVATARS', fetchPlantAvatars);
  yield takeLatest('FETCH_SELECTED_PLANT_AVATAR', fetchSelectedPlantAvatar);
  yield takeLatest('UPDATE_SELECTED_PLANT_AVATAR', updateSelectedPlantAvatar);
}

//worker Saga: will be fired on "FETCH_SELECTED_PLANT_AVATAR" actions
function* fetchSelectedPlantAvatar(action) {
  //fetch current plant avatar growth stage to display for this goal's id
  const ap = action.payload;
  //ap.progress
  //ap.goal_id is goal id
  //ap.user_id

  let growthStage = 0;

  switch (true) {
    case (ap.progress > .875):
      growthStage = 7;
      break;
    case (ap.progress > .75):
      growthStage = 6;
      break;
    case (ap.progress > .625):
      growthStage = 5;
      break;
    case (ap.progress > .5):
      growthStage = 4;
      break;
    case (ap.progress > .375):
      growthStage = 3;
      break;
    case (ap.progress > .25):
      growthStage = 2;
      break;
    case (ap.progress > .125):
      growthStage = 1;
      break;
    default:
      growthStage = 0;
  }
  
  const suns = [
    '/images/suns/Sun0.png',
    '/images/suns/Sun1.png',
    '/images/suns/Sun2.png',
    '/images/suns/Sun3.png',
    '/images/suns/Sun4.png',
    '/images/suns/Sun5.png',
    '/images/suns/Sun6.png',
    '/images/suns/Sun7.png',
    '/images/suns/Sun8.png',
    '/images/suns/Sun9.png',
    '/images/suns/Sun10.png',
    '/images/suns/Sun11.png',
    '/images/suns/Sun12.png',
    '/images/suns/Sun13.png',
    '/images/suns/Sun14.png',
    '/images/suns/Sun15.png',
    '/images/suns/Sun16.png',
    '/images/suns/Sun17.png',
    '/images/suns/Sun18.png',
    '/images/suns/Sun19.png',
    '/images/suns/Sun20.png',
    '/images/suns/Sun21.png',
    '/images/suns/Sun22.png'
    ]
  const sunIndex = Math.round((ap.progress % .125) * 220);

  let sunPathToSend = suns[sunIndex];

  if (!ap.doSun){
    sunPathToSend = '/images/suns/Sun22.png';
  }

  // const progRem125 = ap.progress % .125;
  // console.log("ap.progress % .125:", progRem125);

  // const times220 = progRem125 * 220;
  // console.log("that * 220:", times220);

  // const rounded = Math.round(times220);
  // console.log("that rounded:", rounded);

  try {
    const response = yield axios.get(`/api/plantAvatar/selected`, 
        { params: {growthStage: growthStage, id: ap.goal_id} });
    
    //response.data comes back like {image_path_stage_7: '/images/plantAvatars/BlueBramble8.png'}
    //and we want only the value, not the key. this will produce the value:
    const rdValue = Object.values(response.data)[0];
    yield put({ type: 'UPDATE_GOAL_PROGRESS', payload: { progress: ap.progress, goal_id: ap.goal_id, current_image_path: rdValue,current_sun_path: sunPathToSend, user_id: ap.user_id } });
 
  } catch (error) {
    console.log('plant Avatar get request failed', error);
  }
}

//worker Saga: will be fired on "UPDATE_SELECTED_PLANT_AVATAR" actions
function* updateSelectedPlantAvatar(action){
  const ap = action.payload;
  //ap.plant_avatar_id is the chosen plant avatar's id
  //ap.goal_id is the selectedGoal's id
  //ap.user_id

  try {
    const updatedAvatar = yield axios.put(`/api/plantAvatar/${ap.goal_id}`, 
        { plant_avatar_id: ap.plant_avatar_id });

    //progress for this goal, which we sent back in the router via RETURNING    
    const progress = updatedAvatar.data.progress;    
    
    yield put({ type: 'FETCH_SELECTED_PLANT_AVATAR', payload: {progress: progress, goal_id: ap.goal_id, user_id: ap.user_id} });

  } catch (error) {
    console.log("update Plant Avatar error", error);
  } 
}

// worker Saga: will be fired on "FETCH_PLANT_AVATARS" actions
function* fetchPlantAvatars() {
  //Fetch ALL of the plant avatars at their stage 8 image, for user to choose from
  
  try {
    const response = yield axios.get('/api/plantAvatar/all');
    
    //response.data looks like: 
    //[image_path_stage_5: '/images/plantAvatars/Bush5.png',
    //image_path_stage_8: '/images/plantAvatars/Bush8.png']
    //etc. but we only want the value, not the key. so we map through and collect only the values like so:
    //const vals = response.data.map(item => Object.values(item)[0]);

    yield put({ type: 'SET_PLANT_AVATARS', payload: response.data });

  } catch (error) {
    console.log('plant Avatar get request failed', error);
  }
}



export default plantAvatarsSaga;
