import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function Task(props) {

  const task = props.task;

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [displayIcons, setDisplayIcons] = useState(false);

                  //todo what is task.isEditingMode? - looks like an old prop that is no longer passed - try deleting and testing
  const [editingMode, setEditingMode] = useState(props.isEditingMode || false);

  const [taskName, setTaskName] = useState(task.task_name || '');
  const [editingText, setEditingText] = useState(taskName);

  const [showComplete, setShowComplete] = useState(task.is_complete);
  const [checkBoxImage, setCheckBoxImage] = useState(showComplete ? './images/icons/CheckedBox.png' : './images/icons/Box.png');
  
  const checkedBoxImgPath = './images/icons/CheckedBox.png';
  const boxImgPath = './images/icons/Box.png';


  useEffect(() => {
  }, []);

  const handleChange = (event) =>{
    setEditingText(event.target.value);
  }

  const toggleCompleted = () => {
    let taskToSend = {
      task_name: task.task_name,
      id: task.id,
      goal_id: selectedGoal.id
      //is_complete gets add in the next step, depending if true/false
    }

    //todo this could be DRYer
    if (showComplete) { //if task was complete and we clicked, we mark UN complete
      setShowComplete(false);
      setCheckBoxImage('./images/icons/Box.png');
      taskToSend.is_complete = false;
    } 
    else { //if task was incomplete and we clicked, mark COMPLETE
      setShowComplete(true);
      setCheckBoxImage('./images/icons/CheckedBox.png');
      taskToSend.is_complete = true;
    }
    dispatch({type: 'UPDATE_TASK', payload: taskToSend });
  }

  const confirmButton = () => {
    setTaskName(editingText);

    const taskToSend = {
      task_name: editingText,
      id: task.id,
      is_complete: task.is_complete,
      goal_id: selectedGoal.id
    }
    dispatch({type: 'UPDATE_TASK', payload: taskToSend });
    
    setEditingMode(false);
  }

 

  const cancelButton = () => {
    setEditingMode(false);
  }

  const editButton = () => {
    setEditingMode(true);
    setDisplayIcons(false);
  }

  const deleteButton = () => {
    // delete this task/goal from the db, and make sure to re-render (get again)
    setDisplayIcons(false);
    setEditingMode(false);
    
    dispatch({type: 'DELETE_TASK', payload: task});
  }

  return (
    <div>
      {/* <p>props.task: {JSON.stringify(props.task)}</p> */}
      { editingMode 
        ? 
         <>
          <input className="taskContent" value={editingText} placeholder={task.task_name} type="text" onChange={ (event) => handleChange(event) }></input>
          <Button onClick={confirmButton} className="taskContent iconButton confirmButton">
            <img className="iconImage" src='./images/icons/GreenCheck.png' alt="Confirm editing task"></img>
          </Button>

          <Button onClick={cancelButton} className="taskContent iconButton cancelButton">
            <img className="iconImage" src='./images/icons/RedEx.png' alt="Cancel editing task"></img>
          </Button>
         </>
        : 
          <>
            <Button className="iconButton checkButton taskContent" onClick={() => toggleCompleted()}>
              <img className="iconImage" src={checkBoxImage} alt="Toggle task incomplete/complete"></img>
            </Button>
           
            <p className="taskText taskContent" onClick={() => setDisplayIcons(true)}>{props.task.task_name}</p>
 
            { displayIcons 
              ? 
                <>
                  <Button onClick={editButton} className="iconButton editDeleteButton"> 
                    <img className="iconImage" src='./images/icons/EditIcon.png' alt="Edit task"></img>
                  </Button>
                  <Button onClick={deleteButton} className="iconButton editDeleteButton">
                    <img className="iconImage" src='./images/icons/TrashIcon.png' alt="Delete task"></img>
                  </Button>
                </>
              :
                <></>
            } 
          </>
      }

    </div>
  );
}

export default Task;
