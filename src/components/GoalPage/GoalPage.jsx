import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AddNewTask from '../AddNewTask/AddNewTask';
import GoalTitle from '../GoalTitle/GoalTitle';
import PlantAvatar from '../PlantAvatar/PlantAvatar';
import Task from '../Task/Task';
import { Button, Form, Modal } from 'react-bootstrap';
import ProfileImageThumbnail from '../ProfileImageThumbnail/ProfileImageThumbnail';
import { Link } from 'react-router-dom';
import 'animate.css';


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

  const [showGoalAchievedModal, setShowGoalAchievedModal] = useState(true);

  const [animateClass, setAnimateClass] = useState('');
  const [randomQuote, setRandomQuote] = useState('Congratulations!');

  let quotesArray = [
    'Way to go!',
    'You did it!',
    'Amazing job!',
    'Fantastic work!',
    'Impressive!',
    "You're a real Goal-getter!"
  ];

  const quoteRandomizer = () => {
    let index = Math.floor(Math.random() * quotesArray.length);
    setRandomQuote(quotesArray[index]);
    //floor rounds the number down, random privides a number between 0-1, 
  }

  const delay = (n) => {
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
  }

  useEffect(() => {
    if (!isNew){ //don't try to fetch any tasks if we just opened up a new goal page,since there are none.
      dispatch({ type: 'FETCH_TASKS', payload: selectedGoal.id }); 
    }

    //todo was trying to set the default of animateClass to animateFadeIn to,
    // then shortly after the page loads (using timer), set it to '' 

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

  const checkForGoalCompletion = () => {
    console.log('checking! progress is:', selectedGoal.progress);
  }

  const handleAchieveGoalModalClose = () => {
    setShowGoalAchievedModal(false);
    quoteRandomizer();
  }

  return (
    <div className='container'>
        {/* <p>Page's selected goal: {JSON.stringify(selectedGoal)}</p> */}
        <h2 className="pageSubTitle">Goal:</h2>
        { selectedGoal.is_accomplished 
          ?   
            <>
              <div className="textEmojiBookends">
                <img className="emoji" src="./images/icons/YellowStarShadow.png"></img>
                
                <div className="pageTitleNarrow">
                  <GoalTitle isNew={isNew} goal={selectedGoal}/>
                </div>

                <img className="emoji" src="./images/icons/YellowStarShadow.png"></img>
              </div>

              <div className="centerFlexContainer">
                <h3 className="secondarySubtitle">Accomplished!</h3>
              </div>
            </>  

          : <div className="pageTitle">
              <GoalTitle isNew={isNew} goal={selectedGoal} />
            </div>
        }
        
            <Form.Switch
              className="centerFlexContainer"
              type="switch"
              id="custom-switch"
              label="Visible to Followers"
              checked={visibleToFollowers}
              onChange={toggleVisibility}
            />

        <div className={`${animateClass} cards`}>

            <div className={  selectedGoal.is_accomplished
                              ? 'cardArea cardYellow cardParent cardParentTasks accomplishedGoalBackground ' 
                              : 'cardArea cardYellow cardParent cardParentTasks'}> 
              
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
                  : <img onClick={addTask} className="iconImage iconImageLarge addTaskButton clickableSmall" src='./images/icons/AddIcon.png' alt="Add task"></img>
                }
              </div>

            </div>
              
            <div className={  selectedGoal.is_accomplished
                              ? 'cardArea cardBlue accomplishedGoalBackground ' 
                              : 'cardArea cardBlue'}> 
              <div className="titleLeft">
                <h3>Progress:</h3>
              </div>
              <PlantAvatar isNew={isNew}/>
            </div>
        </div>

        {
          selectedGoal.is_accomplished
          ?
            <Modal show={showGoalAchievedModal} onHide={handleAchieveGoalModalClose} className="achieveModal driveInTop">
                <Modal.Header>
                    <Modal.Title>GOAL ACHIEVED</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div className="modalBodyItem">
                    <p>{selectedGoal.goal_name}: YOU DID IT!</p>
                  </div>  

                  <div className="modalBodyItem">
                    <img className="modalImage" src={selectedGoal.current_avatar_path}/>
                  </div>  

                  <div className="modalBodyItem">
                    <p>{randomQuote}</p>
                  </div>  
                </Modal.Body>

                <Modal.Footer>
                  <Button className="buttonButton" variant="primary" onClick={handleAchieveGoalModalClose}>Yay!</Button>
                </Modal.Footer>
            </Modal>
          : 
          <></>
        }
 
    </div>
  );
}

export default GoalPage;
