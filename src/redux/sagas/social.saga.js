import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* socialSaga() {
  yield takeLatest('ADD_FOLLOWEE', addFollowee);
  yield takeLatest('FETCH_FOLLOWEE_USERS', fetchFolloweeUsers);
  yield takeLatest('FETCH_FOLLOWEE_GOALS', fetchFolloweeGoals);
  yield takeLatest('FETCH_LIKE_STATUS', fetchLikeStatus);

  // yield takeLatest('UPDATE_TASK', updateTask);
  // yield takeLatest('DELETE_TASK', deleteSingleTask);
  // yield takeLatest('DELETE_THIS_GOALS_TASKS', deleteThisGoalsTasks);
}
//worker Saga: will be fired on "FETCH_FOLLOWEE_USERS" actions
// function* deleteSingleTask(action){
//   const ap = action.payload;

//   try {
//     const deletedTask = yield axios.delete(`/api/task/singleTask/${ap.id}`);

//     yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

//   } catch {
//     console.log('delete task error');
//   }
// }

// function* deleteThisGoalsTasks(action){
//   const ap = action.payload;
//   //ap is the goal's id

//   try {
//     const deletedTask = yield axios.delete(`/api/task/thisGoalsTasks/${ap}`);

//     //no need to FETCH_TASKS here - since the goal is deleted it has no tasks to fetch
//     //todo could unset tasks?
    
//   } catch {
//     console.log('delete task error');
//   }
// }

// //worker Saga: will be fired on "UPDATE_TASK" actions
// function* updateTask(action){
//   const ap = action.payload;

//   try {
//     const updatedTask = yield axios.put(`/api/task/${ap.id}`, 
//         { task_name: ap.task_name, 
//           is_complete: ap.is_complete, 
//           goal_id: ap.goal_id });
    

//     yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

//   } catch {
//     console.log('update task error');
//   } 
// }

// worker Saga: will be fired on "FETCH_FOLLOWEE_USERS" actions

//worker Saga: will be fired on "FETCH_LIKE_STATUS" actions
function* fetchLikeStatus(action){
  const ap = action.payload;
  //ap.goal_id = goal id

  console.log('fetch like status ap is:', ap);

  try {
    const response = yield axios.get('/api/social/likes', 
        { params: {goal_id: ap.goal_id} });

    console.log('got this back from fetch like status for goal', ap.goal_id, ':', response.data);
    
  } catch (err) {
    console.log('like status fetch failed:', err);
  }
}

function* fetchFolloweeUsers(action) {
  const ap = action.payload;
  //ap = user id (user is follower, get followees)

  try {
    const response = yield axios.get('/api/social/followees', 
      { params: { follower_id: ap } });
    
    //RESPONSE.DATA is array of users (followees) that this user (follower) follows
    
    yield put({ type: 'SET_FOLLOWEE_USERS', payload: response.data });

  } catch (error) {
    console.log('followee get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_FOLLOWEE_GOALS" actions
function* fetchFolloweeGoals(action) {
  const ap = action.payload;
  //ap.followee_id is id of selectedFollowee (followee)
  //ap.follower_id is the id of the currently logged in user (follower)
  
  //todo - we didn't need to send the follower id? 
  try {
    const followeeGoals = yield axios.get('/api/social/followee_goals', 
      {params: {followee_id: ap.followee_id, follower_id: ap.follower_id} });
        
    yield put({ type: 'SET_FOLLOWEE_GOALS', payload: followeeGoals.data });

  } catch (error) {
    console.log('followee get request failed', error);
  }
}

// worker Saga: will be fired on "ADD_FOLLOWEE" actions
function* addFollowee(action) {
  const ap = action.payload;
  //ap.followee is the username of the user to be followed (followee)
  //ap.follower is the id of the currently logged in user (follower)

  try {
    const followeeID = yield axios.get('/api/social/followee_id', 
        { params: {followee_username: ap.followee} }); 
    //followeeID.data.id is the followee's user ID.

    yield axios.post('/api/social/followee', { followee_id: followeeID.data.id, follower_id: ap.follower });
    
    
    yield put({ type: 'FETCH_FOLLOWEE_USERS', payload: ap.follower });

  } catch {
    console.log('add new followee error');
  }
}

export default socialSaga;
