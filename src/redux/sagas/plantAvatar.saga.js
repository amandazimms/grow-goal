import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* plantAvatarSaga() {
  yield takeLatest('FETCH_PLANT_AVATARS', fetchPlantAvatars);
  yield takeLatest('UPDATE_PLANT_AVATAR', updatePlantAvatar);
}

//worker Saga: will be fired on "UPDATE_TASK" actions
function* updatePlantAvatar(action){
  const ap = action.payload;

  try {
    const updatedTask = yield axios.put(`/api/plantAvatar/${ap.id}`, 
        //todo update v
        { id: ap.id });
                                    //todo check on goal_id here v
    yield put({ type: 'FETCH_PLANT_AVATARS', payload: ap.goal_id });

  } catch (error) {
    console.log("update Plant Avatar error", error);
  } 
}

// worker Saga: will be fired on "FETCH_TASKS" actions
function* fetchPlantAvatars(action) {
  const ap = action.payload;

  try {
    const response = yield axios.get('/api/plantAvatar', 
            //todo update v
      { params: { id: ap } });
                                              //todo update v
    yield put({ type: 'SET_PLANT_AVATAR', payload: response.data });

  } catch (error) {
    console.log('plant Avatar get request failed', error);
  }
}



export default plantAvatarSaga;
