import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchGoal() {
  try {
    console.log('---------------->c');
    const response = yield axios.get('/api/goal');
    yield console.log('---->fetch goal response.data:', response.data)
    yield put({ type: 'SET_GOALS', payload: response.data });
  } catch (error) {
    console.log('Goal get request failed', error);
  }
}

//todo, eventually: add, update, delete goal

function* goalSaga() {
  console.log('---------------->b');
  yield takeLatest('FETCH_GOALS', fetchGoal);
  console.log('---------------->b2');
}

export default goalSaga;
