import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchTask() {
  try {
    
    const response = yield axios.get('/api/task');
    yield put({ type: 'SET_TASKS', payload: response.data });
  } catch (error) {
    console.log('Task get request failed', error);
  }
}

//todo, eventually: add, update, delete task

function* taskSaga() {
  yield takeLatest('FETCH_TASKS', fetchTask);
}

export default taskSaga;