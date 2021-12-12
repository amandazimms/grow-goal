import React, { useState } from 'react';
import EditableText from '../EditableText/EditableText';

function NewGoalPage() {


  const saveGoal = () => {
    //todo save to db
  }

  return (
    <div className="container">
      <h2>ADD NEW GOAL</h2>

      <EditableText isEditingMode={true} placeholderText={'Name of Goal'}/>


      <h3>Task List:</h3>

      <EditableText/>

      <h3>Plant Avatar:</h3>

      <button onClick={saveGoal}>Save Goal</button>
    </div>
  );
}

export default NewGoalPage;
