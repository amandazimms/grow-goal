import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function Task(props) {

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const placeholderText = props.placeholderText || '';

  const [displayIcons, setDisplayIcons] = useState(false);
  const [editingMode, setEditingMode] = useState(props.isEditingMode || false);

  const [taskName, setTaskName] = useState(props.task_name || '');
  const [editingText, setEditingText] = useState(taskName);

  const [showComplete, setShowComplete] = useState(false);
  const [checkBoxImage, setCheckBoxImage] = useState('./images/icons/box.png');
  
  
  const checkedBoxImgPath = './images/icons/checkedBox.png';
  const boxImgPath = './images/icons/box.png';


  useEffect(() => {
    //console.log('log to check about react object children. text:', text, 'editingText:', editingText, 'placeholderText', placeholderText);
  }, [])
  const handleChange = (event) =>{
    setEditingText(event.target.value);
  }


  const toggleCompleted = () => {
    console.log("a toggle. props.task_name is:", props.task_name, "props is:", props);
    let taskToSend = {
      task_name: props.task_name,
      id: props.id,
      goal_id: selectedGoal.id
      //is_complete gets add in the next step, depending if true/false
    }

    //todo this could be DRYer
    if (showComplete) { //if task was complete and we clicked, we mark UN complete
      setShowComplete(false);
      setCheckBoxImage('./images/icons/box.png');
      taskToSend.is_complete = false;
    } 
    else { //if task was incomplete and we clicked, mark COMPLETE
      setShowComplete(true);
      setCheckBoxImage('./images/icons/checkedBox.png');
      taskToSend.is_complete = true;
    }

    dispatch({type: 'UPDATE_TASK', payload: taskToSend });
  }



  const doneButton = () => {
    console.log("done button clicked");

    //todo: this is a hackey way of making it show up immediately, rather than having
    //to navigtate away and come back, for the newly updated task to show
    setTaskName(editingText);

    const taskToSend = {
      task_name: editingText,
      id: props.id,
      is_complete: props.is_complete,
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

  //todo - could we pass two different deleteButton functions as props? one for goal, one for task? since their funcitonality is so different...
  const deleteButton = () => {
    if (confirm("delete this task/goal?")){
      // delete this task/goal from the db, and make sure to re-render (get again)
      setTaskName('Placeholder (This is deleted)');
      setDisplayIcons(false);
      setEditingMode(false);
    }
  }

  return (
    <div>
      {/* <p>{JSON.stringify(props)}</p> */}
      { editingMode 
        ? 
         <>
          <input value={editingText} placeholder={placeholderText} type="text" onChange={ (event) => handleChange(event) }></input>
          <button onClick={doneButton}>done</button>
          <button onClick={cancelButton}>cancel</button>
         </>
        : 
          <>

            
            <button className="iconButton checkButton" onClick={() => toggleCompleted()}>
              <img className="iconImage" src={checkBoxImage} alt="Mark task incomplete"></img>
            </button>
           
            {/* todo also style this text as strikethru vs not if it's complete vs not. */}
            <p className="taskText" onClick={() => setDisplayIcons(true)}>{taskName}</p>
 
            { displayIcons 
              ? 
                <>
                  <button onClick={editButton}>edit</button>
                  <button onClick={deleteButton}>delete</button>
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
