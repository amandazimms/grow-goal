import React from 'react';
import EditableText from '../EditableText/EditableText';

function NewGoalPage() {
  return (
    <div className="container">
      <h2>ADD NEW GOAL</h2>

      {/* get all tasks from the db, map here: */}
      <EditableText/>


    </div>
  );
}

export default NewGoalPage;
