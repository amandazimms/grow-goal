import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function GoalTitle(props) {

  const goal = props.goal;
  const isNew = props.isNew;

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [displayIcons, setDisplayIcons] = useState(false);

  const [editingMode, setEditingMode] = useState(isNew || false);

  const [text, setText] = useState(goal.goal_name || '');

  useEffect(() => {
    
  }, [])
  
  const handleChange = (event) =>{
    setText(event.target.value);
  }

  const doneButton = () => {
    const goalToSend = {
      goal_name: text,
      id: goal.id
    }
    dispatch({type: 'UPDATE_GOAL_TITLE', payload: goalToSend });

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
    if (confirm("delete this ENTIRE GOAL? this action cannot be undone")){
      // delete this task/goal from the db, and make sure to re-render (get again)
      
      dispatch({type: 'DELETE_GOAL', payload: goal});
    }
  }


  return (
    <div>
      { editingMode 
        ? 
         <>
          <input value={text} placeholder={goal.goal_name} type="text" onChange={ (event) => handleChange(event) }></input>
          <button onClick={doneButton}>done</button>
          <button onClick={cancelButton}>cancel</button>
         </>
        : 
          <>
          <p className="goalTitleText" onClick={() => setDisplayIcons(true)}>{text}</p>
 
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
