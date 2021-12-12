import React from 'react';
import EditableText from '../EditableText/EditableText';

function GoalPage() {
  const placeholderTasks = [
    'do the dishes',
    'do the laundry',
    'make coffee'
  ]

  return (
    <div className="container">
      <h2>GOAL TITLE HERE</h2>

      <h3>Task List</h3>

      {/* get all tasks from the db, map here: */}
      {
        placeholderTasks.map(task =>(
            <EditableText task={task} />
        ))
      }

      <h3>Plant Avatar</h3>


    </div>
  );
}

export default GoalPage;
