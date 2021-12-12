import React from 'react';
import EditableText from '../EditableText/EditableText';

function NewGoalPage() {
  

  return (
    <div className="container">
      <h2>ADD NEW GOAL</h2>
      <h4>Goal Name:</h4>
      <EditableText/>


      <h3>Task List</h3>

      <EditableText/>

      <h3>Plant Avatar</h3>


    </div>
  );
}

export default NewGoalPage;
