import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PlantAvatar(props) {
  
  const goal = props.goal;
  const isNew = props.isNew;

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const plantAvatars = useSelector(store  => store.plantAvatars);  

  const [displayEditIcon, setDisplayEditIcon] = useState(false);
  const [editingMode, setEditingMode] = useState(isNew || false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const clickImage = () => {
    if (!editingMode) {
      setDisplayEditIcon(true);
    }
  }

  const cancelButton = () => {
    setEditingMode(false);
  }

  const editButton = () => {
    setEditingMode(true);
    setDisplayEditIcon(false);
  }

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

  const confirmButton = () => {
    //since db is 1-indexed while this array is 0-indexed; add 1 for the next step.
    const plant_avatar_id = selectedImageIndex +1;

    dispatch({type: 'UPDATE_SELECTED_PLANT_AVATAR', payload: {plant_avatar_id: plant_avatar_id, goal_id: selectedGoal.id, user_id: store.user.id} });

    setEditingMode(false);
  }

  return (
    <div>
      <img className="sunImage" src={selectedGoal.current_sun_path}></img>

      {/* if user has clicked the image, display the edit icon. if not, don't display anything */}
      { displayEditIcon 
        ? <img onClick={editButton} className="iconImage iconImageLarge avatarButtonEdit iconAddSideMargins clickableSmall" src='./images/icons/EditIcon.png' alt="Edit task"></img>
        : <></>
      } 

      { editingMode 
        ? 
          <>
          <div className="cardParent cardParentPlantAvatar"> 
            <img onClick={backButton} className="iconImage iconImageXL imageFlip avatarButtonBack clickableSmall" src='./images/icons/Arrow.png' alt="Next image"></img>
            <img className="plantAvatarImage" src={plantAvatars[selectedImageIndex].image_path_stage_7}></img>
            <img onClick={nextButton} className="iconImage iconImageXL avatarButtonNext clickableSmall" src='./images/icons/Arrow.png' alt="Next image"></img>
          </div>

          <div className="bottomButtonContainer">
            <img onClick={confirmButton} className="iconImage iconImageLarge confirmButton iconAddSideMargins clickableSmall" src='./images/icons/GreenCheck.png' alt="Confirm plant avatar choice"></img>
            <img onClick={cancelButton} className="iconImage iconImageLarge cancelButton iconAddSideMargins clickableSmall" src='./images/icons/RedEx.png' alt="Cancel plant avatar choice"></img>
          </div>
          </>
        : 
          <div className={  displayEditIcon 
                            ? `cardParent cardParentPlantAvatar`
                            : `cardParent cardParentPlantAvatar clickable`}> 
            <img className="plantAvatarImage" onClick={clickImage} src={selectedGoal.current_avatar_path}></img>
          </div>
      }

    </div>
  );
}

export default PlantAvatar;
