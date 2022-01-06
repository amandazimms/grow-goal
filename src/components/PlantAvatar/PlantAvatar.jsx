import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

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

  const [sunImagePath, setSunImagePath] = useState("./images/suns/SunT.png");

  useEffect(() => {
  }, []);

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

    dispatch({type: 'UPDATE_SELECTED_PLANT_AVATAR', payload: { plant_avatar_id: plant_avatar_id, goal_id: selectedGoal.id} });

    setEditingMode(false);
  }

  return (
    <div>
      <img className="sunImage" src={sunImagePath}></img>

      {/* if user has clicked the image, display the edit icon. if not, don't display anything */}
      { displayEditIcon 
        ? 
          <Button onClick={editButton} className="iconButton editDeleteButton avatarButtonEdit"> 
            <img className="iconImage iconImageLarge" src='./images/icons/EditIcon.png' alt="Edit task"></img>
          </Button>
        :
          <></>
      } 

      { editingMode 
        ? 
          <>
          <div className="cardParent cardParentPlantAvatar"> 
            <Button onClick={backButton} className="iconButton avatarButtonBack"> 
              <img className="iconImage iconImageXL imageFlip" src='./images/icons/Arrow.png' alt="Next image"></img>
            </Button>

            <img className="plantAvatarImage" src={plantAvatars[selectedImageIndex].image_path_stage_7}></img>
            
            <Button onClick={nextButton} className="iconButton avatarButtonNext"> 
              <img className="iconImage iconImageXL" src='./images/icons/Arrow.png' alt="Next image"></img>
            </Button>
          </div>

          <div className="bottomButtonContainer">
            <Button onClick={confirmButton} className="iconButton confirmButton">
              <img className="iconImage iconImageLarge" src='./images/icons/GreenCheck.png' alt="Confirm plant avatar choice"></img>
            </Button>

            <Button onClick={cancelButton} className="iconButton cancelButton">
              <img className="iconImage iconImageLarge" src='./images/icons/RedEx.png' alt="Cancel plant avatar choice"></img>
            </Button>
          </div>
          </>
        : 
          <div className="cardParent cardParentPlantAvatar"> 
            <img className="plantAvatarImage" onClick={() => setDisplayEditIcon(true)} src={selectedGoal.current_avatar_path}></img>
          </div>
      }


    </div>
  );
}

export default PlantAvatar;
