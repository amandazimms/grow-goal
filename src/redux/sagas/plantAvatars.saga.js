import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Saga for fetching all stage 8 plants for when user is choosing one

function* plantAvatarsSaga() {
  yield takeLatest('FETCH_PLANT_AVATARS', fetchPlantAvatars);
}

// worker Saga: will be fired on "FETCH_PLANT_AVATARS" actions
function* fetchPlantAvatars(action) {
  const ap = action.payload;

  try {
    const response = yield axios.get('/api/plantAvatar/all');
    
    yield put({ type: 'SET_PLANT_AVATARS', payload: response.data });

  } catch (error) {
    console.log('plant Avatar get request failed', error);
  }
}

export default plantAvatarsSaga;
