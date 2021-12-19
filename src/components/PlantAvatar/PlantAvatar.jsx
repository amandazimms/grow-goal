import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ImagePicker from '../ImagePicker/ImagePicker';


function PlantAvatar(props) {
  
  const goal = props.goal;
  const isNew = props.isNew;

  const backArrow = '<';
  const nextArrow = '>';

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);
  const selectedPlantAvatar = useSelector(store => store.selectedPlantAvatar);
  const plantAvatars = useSelector(store => store.plantAvatars);

  const [displayEditIcon, setDisplayEditIcon] = useState(false);

  const [editingMode, setEditingMode] = useState(isNew || false);

  useEffect(() => {
    console.log('in plant avatar dispatch');
    dispatch({ type: 'FETCH_SELECTED_PLANT_AVATAR', payload: selectedGoal });
    dispatch({ type: 'FETCH_PLANT_AVATARS', payload: selectedGoal });
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
    setDisplayEditIcon(false);
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const backButton = () => {
    selectedImageIndex === 0 ?
      setSelectedImageIndex(plantAvatars.length-1)
    : setSelectedImageIndex(selectedImageIndex-1);
  }

  const nextButton = () => {
    selectedImageIndex === plantAvatars.length-1 ?
      setSelectedImageIndex(0)
    : setSelectedImageIndex(selectedImageIndex+1);
  }

  return (
    <div>
      {/* <p>selected PA:{JSON.stringify(selectedPlantAvatar)}</p>
      <p>all PAs:{JSON.stringify(plantAvatars)}</p> */}

      { editingMode 
        ? 
         <>
          <button onClick={backButton}>{backArrow}</button>
            <img className="plantAvatarImage" src={plantAvatars[selectedImageIndex]}></img>
          <button onClick={nextButton}>{nextArrow}</button>

          <button onClick={doneButton}>done</button>
          <button onClick={cancelButton}>cancel</button>
         </>
        : 
          <>

            <img className="plantAvatarImage" onClick={() => setDisplayEditIcon(true)} src={selectedPlantAvatar}></img>
            { displayEditIcon 
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
