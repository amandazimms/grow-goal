import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* profileAvatarsSaga() {
  yield takeLatest('FETCH_ALL_PROFILE_AVATARS', fetchAllProfileAvatars);
  yield takeLatest('UPDATE_PROFILE_AVATAR', updateProfileAvatar);
}

// worker Saga: will be fired on "UPDATE_PROFILE_AVATAR" actions
function* updateProfileAvatar(action) {
  const ap = action.payload;
  //ap.userId is the user's id
  //ap.profileAvatar is the object containing properties and IDs, e.g. eyebrows: 9'
  
  try {
    yield axios.put(`/api/profileAvatar/${ap.userId}`, 
        { profile_avatar: ap.profileAvatar });

    //todo fetch user stuff, including profile avatar? also do this at login?

  } catch (error) {
    console.log('set user profile Avatar request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_PROFILE_AVATARS" actions
function* fetchAllProfileAvatars() {
  //fetch alllll profile image pieces, for use in the profile image edit area
  
  try {
    //HAT
    const allHats = yield axios.get('/api/profileAvatar/all',
          {params: {table: "profile_avatar_hat"} });
    yield put({ type: 'SET_PROFILE_AVATARS_HATS', payload: allHats.data });

    //HAIR
    const allHairs = yield axios.get('/api/profileAvatar/all',
          {params: {table: "profile_avatar_hair"} });
    yield put({ type: 'SET_PROFILE_AVATARS_HAIRS', payload: allHairs.data });

    //EYEBROWS
    const allEyebrows = yield axios.get('/api/profileAvatar/all',
          {params: {table: "profile_avatar_eyebrows"} });
    yield put({ type: 'SET_PROFILE_AVATARS_EYEBROWS', payload: allEyebrows.data });

    //EYES
    const allEyes = yield axios.get('/api/profileAvatar/all',
          {params: {table: "profile_avatar_eyes"} });
    yield put({ type: 'SET_PROFILE_AVATARS_EYES', payload: allEyes.data });

    //NOSE
    const allNoses = yield axios.get('/api/profileAvatar/all',
        {params: {table: "profile_avatar_nose"} });
    yield put({ type: 'SET_PROFILE_AVATARS_NOSES', payload: allNoses.data });

    //DETAILS
    const allDetails = yield axios.get('/api/profileAvatar/all',
        {params: {table: "profile_avatar_detail"} });
    yield put({ type: 'SET_PROFILE_AVATARS_DETAILS', payload: allDetails.data });

    //MOUTH
    const allMouths = yield axios.get('/api/profileAvatar/all',
        {params: {table: "profile_avatar_mouth"} });
    yield put({ type: 'SET_PROFILE_AVATARS_MOUTHS', payload: allMouths.data });

    //HEAD
    const allHeads = yield axios.get('/api/profileAvatar/all',
        {params: {table: "profile_avatar_head"} });
    yield put({ type: 'SET_PROFILE_AVATARS_HEADS', payload: allHeads.data });

    //BODY
    const allBodies = yield axios.get('/api/profileAvatar/all',
        {params: {table: "profile_avatar_body"} });
    yield put({ type: 'SET_PROFILE_AVATARS_BODIES', payload: allBodies.data });

  } catch (error) {
    console.log('profile Avatar get request failed', error);
  }
}



export default profileAvatarsSaga;
