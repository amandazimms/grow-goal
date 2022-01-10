import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* taskSaga() {
  yield takeLatest('ADD_TASK', addTask);
  yield takeLatest('FETCH_TASKS', fetchTasks);
  yield takeLatest('UPDATE_TASK', updateTask);
  yield takeLatest('DELETE_TASK', deleteSingleTask);
}
//worker Saga: will be fired on "DELETE_TASK" actions
function* deleteSingleTask(action){
  const ap = action.payload;
  //ap.user_id
  //ap.task
  //  ap.task.id...
  //  ap.task.goal_id
  
  try {
    const deletedTask = yield axios.delete(`/api/task/singleTask/${ap.task.id}`);

    yield put({ type: 'FETCH_TASKS', payload: {goal_id: ap.task.goal_id, user_id: ap.user_id} });

  } catch {
    console.log('delete task error');
  }
}

//worker Saga: will be fired on "UPDATE_TASK" actions
function* updateTask(action){
  const ap = action.payload;
  //ap.user_id is user id
  //ap.task.task_name, etc. are as expected (see below)

  try {
    const updatedTask = yield axios.put(`/api/task/${ap.task.id}`, 
        { task_name: ap.task.task_name, 
          is_complete: ap.task.is_complete, 
          goal_id: ap.task.goal_id });
    
    yield put({ type: 'UPDATE_TASKS_COMPLETED_COUNT', payload: {is_complete: ap.task.is_complete, user_id: ap.user_id} });
    yield put({ type: 'FETCH_TASKS', payload: {goal_id: ap.task.goal_id, user_id: ap.user_id} });

  } catch {
    console.log('update task error');
  } 
}

// worker Saga: will be fired on "FETCH_TASKS" actions
function* fetchTasks(action) {
  const ap = action.payload;
  //ap.user_id
  //ap.goal_id

  try {
    const response = yield axios.get('/api/task', 
      { params: { id: ap.goal_id } });
    //AP is goal id.
    //RESPONSE.DATA is array of tasks with all properties.
    
    const completedTasks = response.data.filter(task => task.is_complete);
    const progress = completedTasks.length/response.data.length || 0;

    yield put({ type: 'FETCH_SELECTED_PLANT_AVATAR', payload: {progress: progress, goal_id: ap.goal_id, user_id: ap.user_id} });
    yield put({ type: 'SET_TASKS', payload: response.data });

  } catch (error) {
    console.log('Task get request failed', error);
  }
}

// worker Saga: will be fired on "ADD_TASKS" actions
function* addTask(action) {
  const ap = action.payload;
  //ap.task
  //  ap.task.task_name, etc
  //ap.user_id

  try {
    const task = yield axios.post('/api/task', 
        { task_name: ap.task.task_name, 
          is_complete: ap.task.is_complete, 
          goal_id: ap.task.goal_id });
          
    yield put({ type: 'FETCH_TASKS', payload: { goal_id: ap.task.goal_id, user_id: ap.user_id } });

  } catch {
    console.log('add new task error');
  }
}

export default taskSaga;
