import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in

    //response.data.id is user id
    const profileAvatar = yield axios.get('/api/user/profile_avatar', 
      {params: {user_id: response.data.id} })

    //response.data gets all the columns from "user"; profileAvatar.data[0] gets the path of the profile images
    //combine these to set our User reducer so the image path will be handy for use  
    let userToSet = {...response.data, ...profileAvatar.data[0]}

    yield put({ type: 'SET_USER', payload: userToSet });
    
  } catch (error) {
    console.log('User get request failed', error);
  }
}

//worker saga fires on UPDATE_GOALS_ACHIEVED_COUNT
function* updateGoalsAchievedCount(action) {
  //used to ultimately update the USER table to reflect the current # of completed goals
  
  const ap = action.payload;
  //ap.user_id is user id

  try {
    const achievedGoals = yield axios.get(`/api/goal/achieved_count`, 
           { params: {user_id: ap.user_id} });

    yield axios.put(`/api/user/goal_count/${ap.user_id}`, { goals_achieved: achievedGoals.data.length });       

    //todo something
    
  } catch (error) {
    console.log('update goal achieved count error:', error);
  }
}  

//worker saga fires on UPDATE_TASKS_COMPLETED_COUNT
function* updateTasksCompletedCount(action) {
  const ap = action.payload;
  //ap.is_complete is true or false, true representing an ++ to tasks_completed, and false a --
  //ap.user_id is user ID

  try {
    const response = yield axios.put(`/api/user/task_count/${ap.user_id}`, 
      { is_complete: ap.is_complete });

  yield put({ type: 'FETCH_USER' });

  } catch (error) {
    console.log('update tasks completed request failed', error);
  }
}    

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_TASKS_COMPLETED_COUNT', updateTasksCompletedCount);
  yield takeLatest('UPDATE_GOALS_ACHIEVED_COUNT', updateGoalsAchievedCount);
}

export default userSaga;
