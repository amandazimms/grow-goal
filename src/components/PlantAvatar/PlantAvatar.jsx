import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ImagePicker from '../ImagePicker/ImagePicker';


function PlantAvatar(props) {
  
  const goal = props.goal;
  const isNew = props.isNew;

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);
  const plantAvatarURL = useSelector(store => store.plantAvatar);

  const [displayIcons, setDisplayIcons] = useState(false);

  const [editingMode, setEditingMode] = useState(isNew || false);

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

  const imagePaths = [
    '/images/plantAvatars/BlueBramble8.png',
    '/images/plantAvatars/PinkVine8.png',
    '/images/plantAvatars/YellowTulip8.png'
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const backButton = () => {
    selectedImageIndex === 0 ?
      setSelectedImageIndex(imagePaths.length-1)
    : setSelectedImageIndex(selectedImageIndex-1);
  }

  const nextButton = () => {
    selectedImageIndex === imagePaths.length-1 ?
      setSelectedImageIndex(0)
    : setSelectedImageIndex(selectedImageIndex+1);
  }

  return (
    <div>
      {/* <p>{JSON.stringify(selectedGoal)}</p> */}
      { editingMode 
        ? 
         <>
          <button onClick={doneButton}>done</button>
          <button onClick={cancelButton}>cancel</button>
         </>
        : 
          <>
          
            <h5>{JSON.stringify(selectedImageIndex)}</h5>
            <button onClick={backButton}>BACK</button>
              <img className="plantAvatarImage" src={imagePaths[selectedImageIndex]}></img>
            <button onClick={nextButton}>NEXT</button>
 
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

export default PlantAvatar;
