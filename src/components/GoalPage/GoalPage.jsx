import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AddNewText from '../AddNewText/AddNewText';
import GoalTitle from '../GoalTitle/GoalTitle';
import PlantAvatar from '../PlantAvatar/PlantAvatar';
import Task from '../Task/Task';
import { Button } from 'react-bootstrap';

function GoalPage(props) {
  //if we arrived here from clicking "new goal", this will be true and will trigger some conditional renders
  const isNew = props.isNew;

  const store = useSelector(store => store);
  const dispatch = useDispatch();

  const tasks = useSelector(store => store.task);

  const selectedGoal = useSelector(store => store.selectedGoal);

  const [title, setTitle] = useState(selectedGoal.goal_name);
  const [addingTask, setAddingTask] = useState(false);

  useEffect(() => {
    if (!isNew){ //don't try to fetch any tasks if we just opened up a new goal page,since there are none.
      dispatch({ type: 'FETCH_TASKS', payload: selectedGoal.id }); 
    }
  }, []);

  const addTask = () => {
    setAddingTask(true);
  }

  return (
    <div className="container">
      {/* <h5>tasks for this goal: {JSON.stringify(tasks)}</h5> */}
      <h1>Goal:</h1><GoalTitle isNew={isNew} goal={selectedGoal} />

      <h3>Task List:</h3>
      
      <Button onClick={addTask}>+</Button>
      {
        addingTask 
        ? <AddNewText placeholderText={'Describe New Task'} onLeaveAdd={()=>setAddingTask(false)}/>
        : <></>
      }

      {tasks.map(task => {
        return (
          <div key={task.id}>
            <Task task={task}/>
          </div>
          );
      })}

      <h3>Plant Avatar:</h3>
      <PlantAvatar isNew={isNew}/>

    </div>
  );
}

export default GoalPage;
