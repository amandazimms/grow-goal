import React from 'react';
import EditableText from '../EditableText/EditableText';

function GoalPage() {

  //todo change this to get from DB/store
  const placeholderTasks = [
    'do the dishes',
    'do the laundry',
    'make coffee'
  ]

  const placeholderTitle = 'Get Through Tuesday'

  return (
    <div className="container">
      <h1>Goal:</h1><EditableText text={placeholderTitle} />

      <h3>Task List:</h3>

      {
        placeholderTasks.map(task =>(
            <EditableText text={task} />
        ))
      }

      <h3>Plant Avatar:</h3>


    </div>
  );
}

export default GoalPage;
