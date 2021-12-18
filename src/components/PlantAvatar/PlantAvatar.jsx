import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function Task(props) {

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);
  const plantAvatar = useSelector(store => store.plantAvatar);

  const [displayIcons, setDisplayIcons] = useState(false);

  const [editingMode, setEditingMode] = useState(false);

                      //todo add default to imagePath? props.___?
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    dispatch({ type: 'FETCH_PLANT_AVATAR', payload: selectedGoal });
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
      <p>{JSON.stringify(selectedGoal)}</p>
      { editingMode 
        ? 
         <>
          <button onClick={doneButton}>done</button>
          <button onClick={cancelButton}>cancel</button>
         </>
        : 
          <>
            <img className="plantAvatarImage" src={plantAvatar}></img>
 
            { displayIcons 
              ? 
                <>
                  <button onClick={editButton}>edit</button>
                </>
              :
                <>
                </>
            } 
          </>
      }

    </div>
  );
}

export default Task;
