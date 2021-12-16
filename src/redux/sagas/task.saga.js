import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* taskSaga() {
  yield takeLatest('ADD_TASK', addTask);
  yield takeLatest('FETCH_TASKS', fetchTasks);
  yield takeLatest('UPDATE_TASK', updateTask);
  yield takeLatest('DELETE_TASK', deleteTask);
}
//worker Saga: will be fired on "UPDATE_TASK" actions
function* deleteTask(action){
  const ap = action.payload;

  console.log('about to delete this ap:', ap);
  try {
    const deletedTask = yield axios.delete(`/api/task/${ap.id}`);

    yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

  } catch {
    console.log('delete task error');
  }
}

//worker Saga: will be fired on "UPDATE_TASK" actions
function* updateTask(action){
  const ap = action.payload;

  try {
    const updatedTask = yield axios.put(`/api/task/${ap.id}`, 
        { task_name: ap.task_name, 
          is_complete: ap.is_complete, 
          goal_id: ap.goal_id });
    
    yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

  } catch {
    console.log('add new task error');
  } 
}


// worker Saga: will be fired on "ADD_TASKS" actions
function* addTask(action) {
  const ap = action.payload;

  try {
      const task = yield axios.post('/api/task', 
          { task_name: ap.task_name, 
            is_complete: ap.is_complete, 
            goal_id: ap.goal_id });
      
      yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

  } catch {
    console.log('add new task error');
  }
}


// worker Saga: will be fired on "FETCH_TASKS" actions
function* fetchTasks(action) {
  const ap = action.payload;

  try {
    const response = yield axios.get('/api/task', 
      { params: { id: ap } });

    yield put({ type: 'SET_TASKS', payload: response.data });

  } catch (error) {
    console.log('Task get request failed', error);
  }
}



export default taskSaga;
