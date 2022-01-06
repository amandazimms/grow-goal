import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import ImagePiece from '../ImagePiece/ImagePiece';

function ProfileImage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector(store => store.user);

  const hats = useSelector(store => store.profileAvatars.hats);
  const hairs = useSelector(store => store.profileAvatars.hairs);
  const eyebrows = useSelector(store => store.profileAvatars.eyebrows);
  const eyes = useSelector(store => store.profileAvatars.eyes);
  const noses = useSelector(store => store.profileAvatars.noses);
  const faceDetails = useSelector(store => store.profileAvatars.details);
  const mouths = useSelector(store => store.profileAvatars.mouths);
  const heads = useSelector(store => store.profileAvatars.heads);
  const bodies = useSelector(store => store.profileAvatars.bodies);

  const dispatch = useDispatch();

  const [displayEditIcon, setDisplayEditIcon] = useState(false);
  const [editingMode, setEditingMode] = useState(false); 
  const [isEditingClass, setIsEditingClass] = useState('');

  const [detailMode, setDetailMode] = useState(false);
  const [toggleDetailImage, setDetailToggleImage] = useState(detailMode ? './images/icons/DetailsMainToggleD.png' : './images/icons/DetailsMainToggleM.png');
  
  const [zoomedImageClass, setZoomedImageClass] = useState("");
  const [zoomedDividerClass, setZoomedDividerClass] = useState("");

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PROFILE_AVATARS' });
  }, []);

  const clickImage = () => {
    if (!editingMode) {
      setDisplayEditIcon(true);
    }
  }

  const editButton = () => {
    setEditingMode(true);
    setIsEditingClass("cardParentProfileAvatarEditMode");

    setDisplayEditIcon(false);
  }

  const confirmButton = () => {
    //since db is 1-indexed while this array is 0-indexed; add 1 for the next step.
    const plant_avatar_id = selectedImageIndex +1;

    dispatch({type: 'UPDATE_SELECTED_PLANT_AVATAR', payload: { plant_avatar_id: plant_avatar_id, goal_id: selectedGoal.id} });
    
    setEditingMode(false);
    setIsEditingClass("");
  }

  const cancelButton = () => {
    setEditingMode(false);
    setIsEditingClass("");
  }

  const toggleDetailMode = () => {
    if (detailMode) { //if we were previously in detailMode, switch to Main mode
      setDetailMode(false);
      setZoomedImageClass("");
      setZoomedDividerClass("");
      setDetailToggleImage('./images/icons/DetailsMainToggleM.png');
    } 
    else { //if we were previously in Main mode, switch to detailMode
      setDetailMode(true);
      setZoomedImageClass("avatarImagePieceZoomed");
      setZoomedDividerClass("avatarImgPieceDivZoomed");
      setDetailToggleImage('./images/icons/DetailsMainToggleD.png');
    }
  }


  return (
    <div className={`cardArea cardBlue cardParent cardParentProfileAvatar ${isEditingClass}`}> 

      {/* if user has clicked the image, display the edit icon. if not, don't display anything */}
      { displayEditIcon 
        ? 
          <Button onClick={editButton} className="iconButton editDeleteButton avatarButtonEdit"> 
            <img className="iconImage iconImageLarge" src='./images/icons/EditIcon.png' alt="Edit task"></img>
          </Button>
        :
          <></>
      }

      <div className="avatarImagePieceParent" onClick={clickImage}>
          {/*HAT*/} <ImagePiece images={hats} topDistance={"40px"} zIndex={10} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={!detailMode}/>
          {/*HAIR*/} <ImagePiece images={hairs} topDistance={"90px"} zIndex={9} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={!detailMode}/>

          {/*EYEBROWS*/} <ImagePiece images={eyebrows} topDistance={"60px"} zIndex={6} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={detailMode}/>
          {/*EYES*/} <ImagePiece images={eyes} topDistance={"90px"} zIndex={3} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={detailMode}/>
          {/*NOSE*/} <ImagePiece images={noses} topDistance={"120px"} zIndex={2} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={detailMode}/>
          {/*DETAIL*/} <ImagePiece images={faceDetails} topDistance={"155px"} zIndex={2} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={detailMode}/>
          {/*MOUTH*/} <ImagePiece images={mouths} topDistance={"185px"} zIndex={2} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={detailMode}/>

          {/*HEAD*/} <ImagePiece images={heads} topDistance={"150px"} zIndex={1} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={!detailMode}/>
          {/*BODY*/} <ImagePiece images={bodies} topDistance={"200px"} zIndex={0} zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} editMode={editingMode} detailEditingMode={!detailMode}/>
      </div>  

      {
        editingMode
        ?
          <>
          <div className="bottomButtonContainer">
            <Button onClick={toggleDetailMode} className="iconButton"> 
              <img className="iconImageToggle" src={toggleDetailImage} alt="toggle edit details/main"></img>
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
          <></>
      }  
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfileImage;
