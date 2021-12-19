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

                                      //this funkiness < allows us to only use the value (img path), not the key
  const selectedPlantAvatar = useSelector(store => Object.values(store.selectedPlantAvatar)[0]);
 
  const plantAvatars = useSelector(store  => store.plantAvatars);  

  const [displayEditIcon, setDisplayEditIcon] = useState(false);
  const [editingMode, setEditingMode] = useState(isNew || false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    dispatch({ type: 'FETCH_PLANT_AVATARS', payload: selectedGoal });
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

  const doneButton = () => {
    //todo update this v
    const selectedImagePath = plantAvatars[selectedImageIndex].image_path_stage_7;
    console.log("done button clicked, selectedImagePath was:", selectedImagePath);
    
    dispatch({type: 'UPDATE_SELECTED_PLANT_AVATAR', payload: {path: selectedImagePath, id: selectedGoal.id} });

    setEditingMode(false);
  }

  return (
    <div>
      {/* <p>selected PA:{JSON.stringify(selectedPlantAvatar)}</p>
      <p>all PAs:{JSON.stringify(plantAvatars)}</p> */}


      { editingMode 
        ? 
         <>
          <button onClick={backButton}>BACK</button>
            <img className="plantAvatarImage" src={plantAvatars[selectedImageIndex].image_path_stage_7}></img>
          <button onClick={nextButton}>NEXT</button>

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
