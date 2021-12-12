import React, { useState } from 'react';
import EditableText from '../EditableText/EditableText';

function NewGoalPage() {
  const [addingTask, setAddingTask] = useState(false);

  const tasks = [];

  const saveGoal = () => {
    //todo save to db
  }

  const addNewTask = () => {
    setAddingTask(true);
  }

  return (
    <div className="container">
      <h2>ADD NEW GOAL</h2>
      <EditableText isEditingMode={true} placeholderText={'Name of Goal'}/>


      <h3>Task List:</h3>
      <button onClick={addNewTask}>+</button>

      { addingTask 
        ?
          <EditableText isEditingMode={true} placeholderText={'Describe New Task'} />
        :
          <></>    
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
