import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* taskSaga() {
  yield takeLatest('FETCH_TASKS', fetchTasks);
  // yield takeLatest('UPDATE_TASK', updateTask);
  yield takeLatest('ADD_TASK', addTask);
}

//worker Saga: will be fired on "UPDATE_TASK" actions
function* updateTask(action){
  console.log('in update task, action.payload:', action.payload);
  try {
    const resposnse = yield axios.put(`/api/task/${action.payload.id}`, 
        { task_name: action.payload.task_name, goal_id: action.payload.goal_id });
    
    yield put({ type: 'FETCH_TASKS', payload: response.data });

  } catch {
      console.log('add new task error');
  } 
}


// worker Saga: will be fired on "ADD_TASKS" actions
function* addTask(action) {
  try {
      const task = yield axios.post('/api/task', 
          { task_name: action.payload.task_name, is_complete: action.payload.is_complete, goal_id: action.payload.goal_id });
      
      console.log('--->in TASK SAGA, about to fetch these tasks for action.payload.goal_id:', action.payload.goal_id);    
      yield put({ type: 'FETCH_TASKS', payload: action.payload.goal_id });

  } catch {
      console.log('add new task error');
  }
}


// worker Saga: will be fired on "FETCH_TASKS" actions
function* fetchTasks(action) {
  try {
    const response = yield axios.get('/api/task', { params: { id: action.payload } });
    yield put({ type: 'SET_TASKS', payload: response.data });
  } catch (error) {
    console.log('Task get request failed', error);
  }
}



export default taskSaga;
