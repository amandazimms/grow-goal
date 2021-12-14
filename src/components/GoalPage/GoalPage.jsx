import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AddNewText from '../AddNewText/AddNewText';
import EditableText from '../EditableText/EditableText';

function GoalPage() {

  const store = useSelector(store => store);


  const dispatch = useDispatch();
  const tasks = useSelector(store => store.task);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [title, setTitle] = useState('');

  const [addingTask, setAddingTask] = useState(false);

  useEffect(() => {
    console.log('-->Goal Page is about to dispatch a "fetch tasks. the selected goal is:', selectedGoal);
    dispatch({ type: 'FETCH_TASKS', payload: selectedGoal.id }); 
  }, []);

  const addTask = () => {
    setAddingTask(true);
  }

  return (
    <div className="container">
      <h5>{JSON.stringify(store)}</h5>
      <h1>Goal:</h1><EditableText text={selectedGoal.goal_name} />

      <h3>Task List:</h3>
      
      <button onClick={addTask}>+</button>
      {
        addingTask 
        ? <AddNewText placeholderText={'Describe New Task'} onLeaveAdd={()=>setAddingTask(false)}/>
        : <></>
      }

      {tasks.map(task => {
        return (
          <div key={task.id}>
            <EditableText text={task.task_name} />
          </div>
          );
      })}

      <h3>Plant Avatar:</h3>


    </div>
  );
}

export default GoalPage;
