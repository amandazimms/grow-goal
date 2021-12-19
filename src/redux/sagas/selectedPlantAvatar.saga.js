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
    
    //depending on the growth stage, response.data may look like, for example,
    //image_path_stage_5: '/images/plantAvatars/Bush5.png', or
    //image_path_stage_8: '/images/plantAvatars/Bush8.png'. 
    //to always get the value of the first (0) property, no matter the name of the key, we do the following:
    //const val = Object.values(response.data)[0];
   
    yield put({ type: 'SET_SELECTED_PLANT_AVATAR', payload: response.data });

  } catch (error) {
    console.log('plant Avatar get request failed', error);
  }
}

//worker Saga: will be fired on "UPDATE_SELECTED_PLANT_AVATAR" actions
function* updateSelectedPlantAvatar(action){
  //from there, sql query to find this in the column 7/8
  //return the plant_avatar_id on same row
  //set that as plant_avatar_id within the goal for selected goal
  const ap = action.payload;
  //AP is a string url for the image path of stage 8

  try {
    const updatedAvatar = yield axios.put(`/api/plantAvatar/${ap.id}`, 
        { path: ap.path });
                                    //todo check on goal_id here v
    //todo do this? yield put({ type: 'FETCH_SELECTED_PLANT_AVATAR', payload: ap.goal_id });

  } catch (error) {
    console.log("update Plant Avatar error", error);
  } 
}





export default selectedPlantAvatarSaga;
