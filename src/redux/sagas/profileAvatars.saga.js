import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* profileAvatarsSaga() {
  yield takeLatest('FETCH_ALL_PROFILE_AVATARS', fetchAllProfileAvatars);
}

// worker Saga: will be fired on "FETCH_ALL_PROFILE_AVATARS" actions
function* fetchAllProfileAvatars() {
  //fetch alllll profile image pieces, for use in the profile image edit area
  
  try {
    const allHats = yield axios.get('/api/profileAvatar/all',
          {params: {table: "profile_avatar_hat"} });
    yield put({ type: 'SET_PROFILE_AVATAR_HATS', payload: allHats.data });


    const allEyes = yield axios.get('/api/profileAvatar/all',
          {params: {table: "profile_avatar_eyes"} });
    yield put({ type: 'SET_PROFILE_AVATAR_EYES', payload: allEyes.data });

  } catch (error) {
    console.log('profile Avatar get request failed', error);
  }
}



export default profileAvatarsSaga;
