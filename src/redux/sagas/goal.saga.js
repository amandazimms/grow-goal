import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//todo, eventually: add, update, delete goal

function* goalSaga() {
  yield takeLatest('FETCH_GOALS', fetchGoal);
  yield takeLatest('ADD_GOAL', addGoal);
}

// worker Saga: will be fired on "ADD_TASKS" actions
function* addGoal(action) {
  try {
    console.log('add goal saga, action.payload is:', action.payload);
      const goal = yield axios.post('/api/goal', 
          { goal_name: action.payload.goal_name, 
            progress: action.payload.progress, 
            is_accomplished: action.payload.is_accomplished, 
            user_id: action.payload.user_id, 
            plant_avatar_id: action.payload.plant_avatar_id 
          });
      
      yield put({ type: 'SET_SELECTED_GOAL', payload: action.payload } );
      //todo add payload for this user id?

  } catch {
      console.log('add new goal error');
  }
}

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchGoal(action) {
  try {
    console.log('ready to fetch the goals. action (unused?) is:', action);
    const response = yield axios.get('/api/goal');
    console.log('response.data was:', response.data);

    yield put({ type: 'SET_GOALS', payload: response.data });
  } catch (error) {
    console.log('Goal get request failed', error);
  }
}
export default goalSaga;
