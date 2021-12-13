import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import EditableText from '../EditableText/EditableText';

function GoalPage() {

  const store = useSelector(store => store);


  const dispatch = useDispatch();
  const tasks = useSelector(store => store.task);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_TASKS', payload: selectedGoal.id }); 
  }, []);



  return (
    <div className="container">
      <h5>{JSON.stringify(store)}</h5>
      <h1>Goal:</h1><EditableText text={selectedGoal.goal_name} />

      <h3>Task List:</h3>
      {/* {
        tasks.map(task =>(
            <EditableText text={task} />
        ))
      } */}

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
