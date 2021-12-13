import React, { useState } from 'react';
import AddNewText from '../AddNewText/AddNewText';
import EditableText from '../EditableText/EditableText';

function NewGoalPage() {
  const [addingTask, setAddingTask] = useState(false);

  const tasks = [];

  const saveGoal = () => {
    //todo save to db
  }

  const addTask = () => {
    setAddingTask(true);
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
            <EditableText text={task} />
        ))
      }


      <h3>Plant Avatar:</h3>


      <button onClick={saveGoal}>Save Goal</button>
    </div>
  );
}

export default NewGoalPage;
