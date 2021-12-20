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


  try {
    const response = yield axios.get(`/api/plantAvatar/selected`, 
        { params: {growthStage: growthStage, id: ap.id} });
    
    //response.data comes back like {image_path_stage_7: '/images/plantAvatars/BlueBramble8.png'}
    //and we want only the value, not the key. this will produce the value:
    const rdValue = Object.values(response.data)[0];

    yield put({ type: 'UPDATE_GOAL_PROGRESS', payload: { progress: ap.progress, id: ap.id, current_image_path: rdValue } });
 
  } catch (error) {
    console.log('plant Avatar get request failed', error);
  }
}

//worker Saga: will be fired on "UPDATE_SELECTED_PLANT_AVATAR" actions
function* updateSelectedPlantAvatar(action){
  const ap = action.payload;
  //ap.plant_avatar_id is the chosen plant avatar's id
  //ap.goal_id is the selectedGoal's id

  try {
    const updatedAvatar = yield axios.put(`/api/plantAvatar/${ap.goal_id}`, 
        { plant_avatar_id: ap.plant_avatar_id });

    //progress for this goal, which we sent back in the router via RETURNING    
    const progress = updatedAvatar.data.progress;    
    
    yield put({ type: 'FETCH_SELECTED_PLANT_AVATAR', payload: { progress: progress, id: ap.goal_id} });

  } catch (error) {
    console.log("update Plant Avatar error", error);
  } 
}

// worker Saga: will be fired on "FETCH_PLANT_AVATARS" actions
function* fetchPlantAvatars(action) {
  //Fetch ALL of the plant avatars at their stage 8 image, for user to choose from

  const ap = action.payload;

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
