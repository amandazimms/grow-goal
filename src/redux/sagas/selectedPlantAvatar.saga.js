import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Saga for the ONE url representing this goal's current plant avatar's current stage

function* selectedPlantAvatarSaga() {
  yield takeLatest('FETCH_SELECTED_PLANT_AVATAR', fetchSelectedPlantAvatar);
  yield takeLatest('UPDATE_SELECTED_PLANT_AVATAR', updateSelectedPlantAvatar);
}

// worker Saga: will be fired on "FETCH_SELECTED_PLANT_AVATAR" actions
function* fetchSelectedPlantAvatar(action) {
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
    const response = yield axios.get('/api/plantAvatar/selected', 
        { params: { id: ap.id, growthStage: growthStage } });
    
    yield put({ type: 'SET_SELECTED_PLANT_AVATAR', payload: response.data });

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





export default selectedPlantAvatarSaga;
