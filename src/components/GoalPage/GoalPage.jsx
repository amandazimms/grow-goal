import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AddNewTask from '../AddNewTask/AddNewTask';
import GoalTitle from '../GoalTitle/GoalTitle';
import PlantAvatar from '../PlantAvatar/PlantAvatar';
import Task from '../Task/Task';
import { Button, Form } from 'react-bootstrap';
import ProfileImageThumbnail from '../ProfileImageThumbnail/ProfileImageThumbnail';

function GoalPage(props) {
  //if we arrived here from clicking "new goal", this will be true and will trigger some conditional renders
  const isNew = props.isNew;

  const store = useSelector(store => store); //todo delete this?
  const dispatch = useDispatch();

  const tasks = useSelector(store => store.task);

  const selectedGoal = useSelector(store => store.selectedGoal);

  const [title, setTitle] = useState(selectedGoal.goal_name);
  const [addingTask, setAddingTask] = useState(false);
  const [visibleToFollowers, setVisibleToFollowers] = useState(selectedGoal.visibility === "followers" ? true : false || false);

  useEffect(() => {
    if (!isNew){ //don't try to fetch any tasks if we just opened up a new goal page,since there are none.
      dispatch({ type: 'FETCH_TASKS', payload: selectedGoal.id }); 
    }
  }, []);

  const addTask = () => {
    setAddingTask(true);
  }

  const toggleVisibility = () => {
    const goalToSend = {
      visibility: visibleToFollowers ? 'private' : 'followers',
      goal: selectedGoal
    }
    dispatch({type: 'UPDATE_GOAL_VISIBILITY', payload: goalToSend });

    setVisibleToFollowers(!visibleToFollowers);
  };

  return (
    <div className="container">
        {/* <p>Page's selected goal: {JSON.stringify(selectedGoal)}</p> */}
        <h2 className="pageSubTitle">Goal:</h2>
        <div className="pageTitle"><GoalTitle isNew={isNew} goal={selectedGoal} /></div>

            <Form.Switch
              className="centerFlexContainer"
              type="switch"
              id="custom-switch"
              label="Visible to Followers"
              checked={visibleToFollowers}
              onChange={toggleVisibility}
            />

        <div className="cards">

            <div className="cardArea cardYellow cardParent cardParentTasks">
              
              <div className="tasksContainer">
                <h3>To Do:</h3> 
                {tasks.map(task => {
                  return (
                    <div key={task.id}>
                      <Task task={task}/>
                    </div>
                    );
                })}
              </div>

              <div className="bottomButtonContainer">
                { addingTask 
                  ? <AddNewTask placeholderText={'Describe New Task'} onLeaveAdd={()=>setAddingTask(false)}/>
                  : <Button onClick={addTask} className="iconButton addTaskButton">
                      <img className="iconImage iconImageLarge" src='./images/icons/AddIcon.png' alt="Add task"></img>
                    </Button> 
                }
              </div>

            </div>

            <ProfileImageThumbnail userToDisplay={store.user} containerWidth={"100px"} containerHeight={"auto"}/>
              
            <div className="cardArea cardBlue">  
              <h3>Progress:</h3>
              <PlantAvatar isNew={isNew}/>
            </div>
        </div>

    </div>
  );
}

export default GoalPage;
