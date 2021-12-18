import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function Task(props) {

  // const task = props.task;

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [displayIcons, setDisplayIcons] = useState(false);

  const [editingMode, setEditingMode] = useState(false);

                      //todo add default to imagePath? props.___?
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
  }, []);

  const handleChange = (event) =>{
  }

  const doneButton = () => {
    // const taskToSend = {
    //   task_name: text,
    //   id: task.id,
    //   is_complete: task.is_complete,
    //   goal_id: selectedGoal.id
    // }
    // dispatch({type: 'UPDATE_TASK', payload: taskToSend });

    // setEditingMode(false);
  }

  const cancelButton = () => {
    setEditingMode(false);
  }

  const editButton = () => {
    setEditingMode(true);
    setDisplayIcons(false);
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
