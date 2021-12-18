import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function Task(props) {

  const task = props.task;

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [displayIcons, setDisplayIcons] = useState(false);

                  //todo what is task.isEditingMode?
  const [editingMode, setEditingMode] = useState(props.isEditingMode || false);

  const [text, setText] = useState(task.task_name || '');

  const [showComplete, setShowComplete] = useState(false);
  const [checkBoxImage, setCheckBoxImage] = useState('./images/icons/box.png');
  
  
  const checkedBoxImgPath = './images/icons/checkedBox.png';
  const boxImgPath = './images/icons/box.png';


  useEffect(() => {
    //console.log('log to check about react object children. text:', text, 'editingText:', editingText, 'placeholderText', placeholderText);
  }, []);

  const handleChange = (event) =>{
    setText(event.target.value);
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
    const taskToSend = {
      task_name: text,
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
    if (confirm("delete this task?")){
      // delete this task/goal from the db, and make sure to re-render (get again)
      setDisplayIcons(false);
      setEditingMode(false);
      
      dispatch({type: 'DELETE_TASK', payload: task});
    }
  }

  return (
    <div>
      {/* <p>{JSON.stringify(props)}</p> */}
      { editingMode 
        ? 
         <>
          <input value={text} placeholder={task.task_name} type="text" onChange={ (event) => handleChange(event) }></input>
          <button onClick={doneButton}>done</button>
          <button onClick={cancelButton}>cancel</button>
         </>
        : 
          <>
            <button className="iconButton checkButton" onClick={() => toggleCompleted()}>
              <img className="iconImage" src={checkBoxImage} alt="Mark task incomplete"></img>
            </button>
           
            {/* todo also style this text as strikethru vs not if it's complete vs not. */}
            <p className="taskText" onClick={() => setDisplayIcons(true)}>{text}</p>
 
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
