import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* goalSaga() {
  yield takeLatest('ADD_GOAL', addGoal);
  yield takeLatest('FETCH_GOALS', fetchGoal);
  yield takeLatest('UPDATE_GOAL_TITLE', updateGoalTitle);
  yield takeLatest('UPDATE_GOAL_PROGRESS', updateGoalProgress); 
  yield takeLatest('DELETE_GOAL', deleteGoal);
}

// worker Saga: will be fired on "UPDATE_GOAL_TITLE" actions
function* updateGoalTitle(action) {
  const ap = action.payload;

  try {
    const updatedGoal = yield axios.put(`/api/goal/${ap.id}`, 
        { goal_name: ap.goal_name });
    
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

  try {
    const updatedGoal = yield axios.put(`/api/goal/progress/${ap.id}`, 
        { progress: ap.progress });
  
   console.log("will now SET goal progress/avatar with this progress:", ap.progress, "and this id:", ap.id);
   yield put({ type: 'SET_GOAL_PROGRESS', payload: ap.progress });
   yield put({ type: 'FETCH_SELECTED_PLANT_AVATAR', payload: {progress: ap.progress, id: ap.id} })

  } catch {
    console.log('update goal progresss error');
  } 
}

// worker Saga: will be fired on "DELETE_GOAL" actions
function* deleteGoal(action) {
  const ap = action.payload;

  try {
    const deletedTask = yield axios.delete(`/api/goal/${ap.id}`);

    //todo navigate to goals page.

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

    yield put({ type: 'FETCH_TASKS', payload: newGoal.id });
    
  } catch {
      console.log('add new goal error');
  }
}

// worker Saga: will be fired on "FETCH_GOAL" actions
function* fetchGoal(action) {
  try {
    const response = yield axios.get('/api/goal');

    yield put({ type: 'SET_GOALS', payload: response.data });
  } catch (error) {
    console.log('Goal get request failed', error);
  }
}
export default goalSaga;
