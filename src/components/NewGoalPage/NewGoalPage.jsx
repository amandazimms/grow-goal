import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNewText from '../AddNewText/AddNewText';
import EditableText from '../EditableText/EditableText';

function NewGoalPage() {

  const store = useSelector(store => store);
  const dispatch = useDispatch();

  const tasks = useSelector(store => store.task);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [title, setTitle] = useState(selectedGoal.goal_name);
  const [addingTask, setAddingTask] = useState(false);

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_TASKS', payload: selectedGoal.id }); 
  // }, []);

  const addTask = () => {
    setAddingTask(true);
  }

  const saveGoal = () => {
    //todo save to db
  }

  return (
    <div className="container">
      <h2>ADD NEW GOAL</h2>
      <EditableText isEditingMode={true} placeholderText={'Name of Goal'}/>


      <h3>Task List:</h3>
      
      <button onClick={addTask}>+</button>
      {
        addingTask 
        ? <AddNewText placeholderText={'Describe New Task'} onLeaveAdd={()=>setAddingTask(false)}/>
        : <></>
      }

      {
        tasks.map(task =>(
            <EditableText text={task.task_name} />
        ))
      }


      <h3>Plant Avatar:</h3>


      <button onClick={saveGoal}>Save Goal</button>
    </div>
  );
}

export default NewGoalPage;
