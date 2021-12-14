import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//todo, eventually: add, update, delete task

function* taskSaga() {
  yield takeLatest('FETCH_TASKS', fetchTask);
  yield takeLatest('ADD_TASK', addTask);
}


function* addTask(action) {
  try {
      const task = yield axios.post('/api/task', { task_name: action.payload.task_name, is_complete: action.payload.is_complete, goal_id: action.payload.goal_id });
      console.log('posting task:', task.data);
      yield put({ type: 'FETCH_TASKS'});

  } catch {
      console.log('add new task error');
  }
}


// worker Saga: will be fired on "FETCH_USER" actions
function* fetchTask(action) {
  try {
    console.log('fetch task action,payload:', action.payload)
    const response = yield axios.get('/api/task', { params: { id: action.payload } });
    yield put({ type: 'SET_TASKS', payload: response.data });
  } catch (error) {
    console.log('Task get request failed', error);
  }
}



export default taskSaga;
