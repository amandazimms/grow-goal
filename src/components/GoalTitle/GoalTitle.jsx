import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function GoalTitle(props) {

  const goal = props.goal;

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [displayIcons, setDisplayIcons] = useState(false);

              //todo what is task.isEditingMode?
  const [editingMode, setEditingMode] = useState(props.isEditingMode || false);

  const [text, setText] = useState(props.text || '');
  const [editingText, setEditingText] = useState(text);

  useEffect(() => {
    //console.log('log to check about react object children. text:', text, 'editingText:', editingText, 'placeholderText', placeholderText);
  }, [])
  
  const handleChange = (event) =>{
    setEditingText(event.target.value);
  }

  const doneButton = () => {
    //todo rework
    // console.log("done button clicked");

    // setText(editingText);

    //   const taskToSend = {
    //     task_name: editingText,
    //     id: props.id,
    //     goal_id: selectedGoal.id
    //   }
    //   dispatch({type: 'UPDATE_GOAL_TITLE', payload: taskToSend })
    //   setEditingMode(false);
  }

  const cancelButton = () => {
    setEditingMode(false);
  }

  const editButton = () => {
    setEditingMode(true);
    setDisplayIcons(false);
  }

  const deleteButton = () => {
    if (confirm("delete this ENTIRE GOAL? this action cannot be undone")){
      // delete this task/goal from the db, and make sure to re-render (get again)
      
      dispatch({type: 'DELETE_GOAL', payload: goal});
    }
  }


  return (
    <div>
      { editingMode 
        ? 
         <><input value={editingText} placeholder={goal.goal_name} type="text" onChange={ (event) => handleChange(event) }></input>
         <button onClick={doneButton}>done</button>
         <button onClick={cancelButton}>cancel</button></>
        : 
          <>
          <p className="goalTitleText" onClick={() => setDisplayIcons(true)}>{goal.goal_name}</p>
 
          { displayIcons 
            ? 
              <><button onClick={editButton}>edit</button>
              <button onClick={deleteButton}>delete</button></>
            :
              <></>
          } </>
        
      }

     
    </div>
  );
}

export default GoalTitle;
