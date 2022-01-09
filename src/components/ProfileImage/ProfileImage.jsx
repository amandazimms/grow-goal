import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import ImagePiece from '../ImagePiece/ImagePiece';

function ProfileImage() {
  const user = useSelector(store => store.user);

  const childFunc = React.useRef(null);

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

  const [currentSelections, setCurrentSelections] = useState({
                            hat: user.profile_avatar_hat_id, 
                            hair: user.profile_avatar_hair_id,
                            eyebrows: user.profile_avatar_eyebrows_id, 
                            eyes: user.profile_avatar_eyes_id,
                            nose: user.profile_avatar_nose_id, 
                            details: user.profile_avatar_detail_id, 
                            mouth: user.profile_avatar_mouth_id,
                            head: user.profile_avatar_head_id,
                            body: user.profile_avatar_body_id
                          })

  const [detailMode, setDetailMode] = useState(false);
  const [toggleDetailImage, setDetailToggleImage] = useState(detailMode ? './images/icons/DetailsMainToggleD.png' : './images/icons/DetailsMainToggleM.png');
  
  const [zoomedImageClass, setZoomedImageClass] = useState("");
  const [zoomedDividerClass, setZoomedDividerClass] = useState("");

  const [randoms, setRandoms] = useState( [0,0, 0,0, 0,0,0, 0,0] );

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

  const randomizeButton = () => {
    let newRandoms = []
    for (let i=0; i<randoms.length; i++){
      let rand = Math.floor(Math.random() * 4);
      newRandoms.push(rand);
    }
    setRandoms(newRandoms);
  }

  const confirmButton = () => {
    dispatch({type: 'UPDATE_PROFILE_AVATAR', payload: { profileAvatar: currentSelections, userId: user.id } });
    
    setEditingMode(false);
    if (detailMode){
      toggleDetailMode();
    }
    setIsEditingClass("");
  }

  const cancelButton = () => {
    setEditingMode(false);
    if (detailMode){
      toggleDetailMode();
    }
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

  const updateCurrentSelections = (newKey, newValue) => {
    //function passed down to each ImagePiece as props. 
    //spreads the new property (e.g. hat: 6) into the currentSelections array.

    let newProperty = {[newKey]: newValue};
    let newSelections = {...currentSelections, ...newProperty};
    
    console.log('setting new selections. current:', currentSelections, 'new property:', newProperty);

    setCurrentSelections(newSelections);
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

          {/*HAT*/} <ImagePiece   random={randoms[0]} images={hats} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"hat"} defaultIndex={user.profile_avatar_hat_id}
                                  topDistance={"40px"} zIndex={10} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={!detailMode}/>

          {/*HAIR*/} <ImagePiece  random={randoms[1]} images={hairs} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"hair"} defaultIndex={user.profile_avatar_hair_id}
                                  topDistance={"90px"} zIndex={9} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={!detailMode}/>

          {/*BROWS*/} <ImagePiece random={randoms[2]} images={eyebrows} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"eyebrows"} defaultIndex={user.profile_avatar_eyebrows_id}
                                  topDistance={"60px"} zIndex={6} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={detailMode}/>

          {/*EYES*/} <ImagePiece  random={randoms[3]} images={eyes} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"eyes"} defaultIndex={user.profile_avatar_eyes_id}
                                  topDistance={"90px"} zIndex={4} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={detailMode}/>

          {/*NOSE*/} <ImagePiece  random={randoms[4]} images={noses} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"nose"} defaultIndex={user.profile_avatar_nose_id}
                                  topDistance={"120px"} zIndex={2} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={detailMode}/>

          {/*DEET*/} <ImagePiece  random={randoms[5]} images={faceDetails} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"details"} defaultIndex={user.profile_avatar_detail_id}
                                  topDistance={"155px"} zIndex={2} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={detailMode}/>

          {/*MOUTH*/} <ImagePiece random={randoms[6]} images={mouths} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"mouth"} defaultIndex={user.profile_avatar_mouth_id}
                                  topDistance={"185px"} zIndex={3} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={detailMode}/>

          {/*HEAD*/} <ImagePiece  random={randoms[7]} images={heads} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"head"} defaultIndex={user.profile_avatar_head_id}
                                  topDistance={"150px"} zIndex={1} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={!detailMode}/>

          {/*BODY*/} <ImagePiece  random={randoms[8]} images={bodies} updateCurrentSelections={updateCurrentSelections} 
                                  pieceName={"body"} defaultIndex={user.profile_avatar_body_id}
                                  topDistance={"200px"} zIndex={0} 
                                  zoomedImgClass={zoomedImageClass} zoomedDivClass={zoomedDividerClass} 
                                  editMode={editingMode} detailEditingMode={!detailMode}/>
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
            {/* <Button onClick={randomizeButton} className="iconButton confirmButton">
              <img className="iconImage iconImageLarge" src='./images/icons/DiceIcon.png' alt="Randomize profile avatar choice"></img>
            </Button> */}

            <Button onClick={cancelButton} className="iconButton cancelButton">
              <img className="iconImage iconImageLarge" src='./images/icons/RedEx.png' alt="Cancel profile avatar choice"></img>
            </Button>

            <Button onClick={confirmButton} className="iconButton confirmButton">
              <img className="iconImage iconImageLarge" src='./images/icons/GreenCheck.png' alt="Confirm profile avatar choice"></img>
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
