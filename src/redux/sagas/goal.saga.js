import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//todo, eventually: add, update, delete goal

function* goalSaga() {
  yield takeLatest('FETCH_GOALS', fetchGoal);
  yield takeLatest('ADD_GOAL', addGoal);
}

// worker Saga: will be fired on "ADD_GOAL" actions
function* addGoal(action) {
  try {
    let newGoal = {
      goal_name: action.payload.goal_name, 
      progress: action.payload.progress, 
      is_accomplished: action.payload.is_accomplished, 
      user_id: action.payload.user_id, 
      plant_avatar_id: action.payload.plant_avatar_id 
    }

    const goal = yield axios.post('/api/goal', newGoal);
              //todo add payload for this user id?

    newGoal = { ...newGoal, id: goal.data.id }

    //whenever adding a goal, we should also set it as the selected_goal, since that will always be the case.
    yield put({ type: 'SET_SELECTED_GOAL', payload: newGoal });

    console.log('--->in GOAL SAGA, about to fetch these tasks for newGoal.id:', newGoal.id);    
    yield put({ type: 'FETCH_TASKS', payload: newGoal.id })

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
