import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//todo, eventually: add, update, delete goal

function* goalSaga() {
  yield takeLatest('FETCH_GOALS', fetchGoal);
}


// worker Saga: will be fired on "FETCH_USER" actions
function* fetchGoal() {
  try {
    const response = yield axios.get('/api/goal');
    yield put({ type: 'SET_GOALS', payload: response.data });
  } catch (error) {
    console.log('Goal get request failed', error);
  }
}
export default goalSaga;
