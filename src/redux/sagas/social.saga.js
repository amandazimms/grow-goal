import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* socialSaga() {
  yield takeLatest('ADD_FOLLOWEE', addFollowee);
  yield takeLatest('FETCH_FOLLOWEE_USERS', fetchFolloweeUsers);
  yield takeLatest('FETCH_FOLLOWEE_GOALS', fetchFolloweeGoals);
  
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
  
  try {
    const followeeGoals = yield axios.get('/api/social/followee_goals', 
      {params: {followee_id: ap.followee_id, follower_id: ap.follower_id} });
    
    //followeeGoals.data[i] have properties: current_avatar_path, followee_id, goal_id, goal_name, like_count
    //e.g., followeeGoals.data[0].goal_id is first goal's id.

    const goalIDs = followeeGoals.data.map(item => item.goal_id);
    //goalIDs are the goal ids (only) of the fetched followee goals
    
    let likeStatusArray = [];

    //todo refactor to combine this and next loop
    for(let i=0; i<goalIDs.length; i++){
      let likeStatusThisGoal = yield axios.get('/api/social/follower_like_status',
        {params: {goal_id: goalIDs[i], follower_id: ap.follower_id} });

      likeStatusThisGoal.data.length === 0 ? likeStatusArray.push(false) : likeStatusArray.push(true);
    }
   
    let followeeGoalsToSet = [];

    for (let i=0; i<followeeGoals.data.length; i++){
      let thisGoal = {  current_avatar_path: followeeGoals.data[i].current_avatar_path,
                        followee_id: followeeGoals.data[i].followee_id,
                        goal_id: followeeGoals.data[i].goal_id,
                        goal_name: followeeGoals.data[i].goal_name,
                        like_count: followeeGoals.data[i].like_count,
                        follower_like_status: likeStatusArray[i]
                      }
      followeeGoalsToSet.push(thisGoal);                
    }                  

    yield put({ type: 'SET_FOLLOWEE_GOALS', payload: followeeGoalsToSet });

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
