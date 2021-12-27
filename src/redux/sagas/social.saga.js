import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* socialSaga() {
  // yield takeLatest('ADD_TASK', addTask);
  yield takeLatest('FETCH_FOLLOWEE_USERS', fetchFolloweeUsers);
  // yield takeLatest('UPDATE_TASK', updateTask);
  // yield takeLatest('DELETE_TASK', deleteSingleTask);
  // yield takeLatest('DELETE_THIS_GOALS_TASKS', deleteThisGoalsTasks);
}
//worker Saga: will be fired on "UPDATE_TASK" actions
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

// // worker Saga: will be fired on "FETCH_FOLLOWEE_USERS" actions
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

// // worker Saga: will be fired on "ADD_TASKS" actions
// function* addTask(action) {
//   const ap = action.payload;

//   try {
//     const task = yield axios.post('/api/task', 
//         { task_name: ap.task_name, 
//           is_complete: ap.is_complete, 
//           goal_id: ap.goal_id });
          
//     yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

//   } catch {
//     console.log('add new task error');
//   }
// }

export default socialSaga;
