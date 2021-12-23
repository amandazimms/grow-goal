import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* goalSaga() {
  yield takeLatest('ADD_GOAL', addGoal);
  yield takeLatest('FETCH_GOALS', fetchGoals);
  yield takeLatest('UPDATE_GOAL_TITLE', updateGoalTitle);
  yield takeLatest('UPDATE_GOAL_PROGRESS', updateGoalProgress); 
  yield takeLatest('DELETE_GOAL', deleteGoal);
}

// worker Saga: will be fired on "UPDATE_GOAL_TITLE" actions
function* updateGoalTitle(action) {
  const ap = action.payload;
  console.log('--------_>in update goal title; ap is:', action.payload);

  try {
    const updatedGoal = yield axios.put(`/api/goal/name/${ap.id}`, 
        { goal_name: ap.goal_name });
    
    //need to send a payload for fetch_goals so that we can access the ap.USER    
    yield put({ type: 'FETCH_GOALS', payload: ap.id });

  } catch {
    console.log('update goal title error');
  } 
}

//worker Saga: will be fired on "UPDATE_GOAL_PROGRESS" actions
function* updateGoalProgress(action) { 
  const ap = action.payload;
  //AP.progress is PROGRESS percentage (eg .5)
  //AP.id is selected Goal id.
  //AP.current_image_path is the url to this growth stage of the plant avatar

  try {
    //we want to update the selected goal's progress and current_avatar_path columns
    const updatedGoal = yield axios.put(`/api/goal/progress/${ap.id}`, 
        { progress: ap.progress, current_image_path: ap.current_image_path });

    yield put({ type: 'SET_SELECTED_GOAL_IMAGE', payload: {current_avatar_path: ap.current_image_path} });

    //need to send a payload for fetch_goals so that we can access the ap.USER    
    yield put({ type: 'FETCH_GOALS', payload: ap.id });

  } catch {
    console.log('update goal progresss error');
  } 
}

// worker Saga: will be fired on "DELETE_GOAL" actions
function* deleteGoal(action) {
  const ap = action.payload;
  //ap is the goal
  //ap.id is the goal-to-be-deleted 's id

  try {
    const deletedTask = yield axios.delete(`/api/goal/${ap.id}`);
    
    yield put({ type: 'DELETE_THIS_GOALS_TASKS', payload: ap });

    //need to send a payload for fetch_goals so that we can access the ap.USER    
    yield put({ type: 'FETCH_GOALS', payload: ap.id });

  } catch {
    console.log('delete goal error');

  }

}

// worker Saga: will be fired on "ADD_GOAL" actions
function* addGoal(action) {  
  const ap = action.payload;
  try {
    let newGoal = {
      goal_name: ap.goal_name, 
      progress: ap.progress, 
      is_accomplished: ap.is_accomplished, 
      user_id: ap.user_id, 
      plant_avatar_id: ap.plant_avatar_id 
    }

    const goal = yield axios.post('/api/goal', newGoal);
              //todo add payload for this user id?

    newGoal = { ...newGoal, id: goal.data.id }

    //whenever adding a goal, we should also set it as the selected_goal, since that will always be the case.
    yield put({ type: 'SET_SELECTED_GOAL', payload: newGoal });

    //by definition there are no tasks at this point (at the instant of clicking "add new goal"),
    //so set tasks reducer to an empty array
    yield put({ type: 'SET_TASKS', payload: [] });

    //need to send a payload for fetch_goals so that we can access the ap.USER    
    yield put({ type: 'FETCH_GOALS', payload: ap.id });
    
  } catch {
      console.log('add new goal error');
  }
}

// worker Saga: will be fired on "FETCH_GOAL" actions
function* fetchGoals(action) {
  const ap = action.payload;
  console.log("*** in fetch goals, ap is:", action.payload);
  
  try {
    const response = yield axios.get('/api/goal',       
        { params: { userId: ap.user.id } });

    yield put({ type: 'SET_GOALS', payload: response.data });

  } catch (error) {
    console.log('Goal get request failed', error);
  }
}
export default goalSaga;
