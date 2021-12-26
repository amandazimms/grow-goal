import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* socialSaga() {
  // yield takeLatest('ADD_TASK', addTask);
  // yield takeLatest('FETCH_TASKS', fetchTasks);
  // yield takeLatest('UPDATE_TASK', updateTask);
  // yield takeLatest('DELETE_TASK', deleteSingleTask);
  // yield takeLatest('DELETE_THIS_GOALS_TASKS', deleteThisGoalsTasks);
}
//worker Saga: will be fired on "UPDATE_TASK" actions
// function* deleteSingleTask(action){
//   const ap = action.payload;

//   try {
//     const deletedTask = yield axios.delete(`/api/task/singleTask/${ap.id}`);

//     yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

//   } catch {
//     console.log('delete task error');
//   }
// }

// function* deleteThisGoalsTasks(action){
//   const ap = action.payload;
//   //ap is the goal's id

//   try {
//     const deletedTask = yield axios.delete(`/api/task/thisGoalsTasks/${ap}`);

//     //no need to FETCH_TASKS here - since the goal is deleted it has no tasks to fetch
//     //todo could unset tasks?
    
//   } catch {
//     console.log('delete task error');
//   }
// }

// //worker Saga: will be fired on "UPDATE_TASK" actions
// function* updateTask(action){
//   const ap = action.payload;

//   try {
//     const updatedTask = yield axios.put(`/api/task/${ap.id}`, 
//         { task_name: ap.task_name, 
//           is_complete: ap.is_complete, 
//           goal_id: ap.goal_id });
    

//     yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

//   } catch {
//     console.log('update task error');
//   } 
// }

// // worker Saga: will be fired on "FETCH_TASKS" actions
// function* fetchTasks(action) {
//   const ap = action.payload;

//   try {
//     const response = yield axios.get('/api/task', 
//       { params: { id: ap } });
//     //AP is goal id.
//     //RESPONSE.DATA is array of tasks with all properties.
    
//     const completedTasks = response.data.filter(task => task.is_complete);
//     const progress = completedTasks.length/response.data.length || 0;

//     yield put({ type: 'FETCH_SELECTED_PLANT_AVATAR', payload: {progress: progress, id: ap} });
//     yield put({ type: 'SET_TASKS', payload: response.data });

//   } catch (error) {
//     console.log('Task get request failed', error);
//   }
// }

// // worker Saga: will be fired on "ADD_TASKS" actions
// function* addTask(action) {
//   const ap = action.payload;

//   try {
//     const task = yield axios.post('/api/task', 
//         { task_name: ap.task_name, 
//           is_complete: ap.is_complete, 
//           goal_id: ap.goal_id });
          
//     yield put({ type: 'FETCH_TASKS', payload: ap.goal_id });

//   } catch {
//     console.log('add new task error');
//   }
// }

export default socialSaga;
