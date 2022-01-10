import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ImagePiece(props) {

  const images = props.images;
  const pieceName = props.pieceName;
  const defaultImageIndex = props.defaultIndex;

  const myRandom = props.random || 0;

  const editingMode = props.editMode;
  const showMyArrows = props.detailEditingMode;
  const zoomedImgClass = props.zoomedImgClass;
  const zoomedDivClass = props.zoomedDivClass;

  const updateCurrentSelections = props.updateCurrentSelections;

  const dispatch = useDispatch();
                                                          //-1 beccause DB is 1 indexed
  const [selectedImageIndex, setSelectedImageIndex] = useState(defaultImageIndex-1);
  const [selectedImagePath, setSelectedImagePath] = useState(images[defaultImageIndex-1].image_path);

  useEffect(() => {
                                          //(+1 to account for 1-indexed DB)
    updateCurrentSelections(pieceName, defaultImageIndex-1 +1);
  }, []);

  
  const profileImageStyle = {
    zIndex: props.zIndex
  }
  const buttonStyleBack = {
    position: "absolute",
    top: props.topDistance,
    left: 0
  };

  const buttonStyleNext = {
    position: "absolute",
    top: props.topDistance,
    right: 0
  };

  const backButton = () => {
    if (selectedImageIndex === 0) { 
      setSelectedImageIndex(images.length-1);
      setSelectedImagePath(images[images.length-1].image_path);

      //sends the chosen image piece up via props to ProfileImage component (+1 to account for 1-indexed DB)
      updateCurrentSelections(pieceName, images.length-1 +1);
    } 
    else {
      setSelectedImageIndex(selectedImageIndex-1);
      setSelectedImagePath(images[selectedImageIndex-1].image_path);

      //sends the chosen image piece up via props to ProfileImage component (+1 to account for 1-indexed DB)
      updateCurrentSelections(pieceName, selectedImageIndex-1 +1);
    }
  }

  const nextButton = () => {
    if (selectedImageIndex === images.length-1) {
      setSelectedImageIndex(0)
      setSelectedImagePath(images[0].image_path);

      //sends the chosen image piece up via props to ProfileImage component (+1 to account for 1-indexed DB)
      updateCurrentSelections(pieceName, 0 +1);
    } 
    else {
      setSelectedImageIndex(selectedImageIndex+1);
      setSelectedImagePath(images[selectedImageIndex+1].image_path);

      //sends the chosen image piece up via props to ProfileImage component (+1 to account for 1-indexed DB)
      updateCurrentSelections(pieceName, selectedImageIndex+1 +1);
    }
  }

  return (
    <>
      { 
        //if my arrows should be shown (based on props, depending whether I'm a detail/main piece and which mode we're in)...
        //and we're in edigint mode, show them
        //  (back button will render left of image, and next will render right, due to flex order)
        //
        //if ^ those aren't true, render no buttons.
        showMyArrows && editingMode 
        ?
          <>
            <img onClick={backButton} style={buttonStyleBack} className="iconImageLarge imageFlip floatTopButton avatarButtonBack profileAvatarBackNext clickableSmall" src='./images/icons/Arrow.png' alt="Next image"></img>
            <img onClick={nextButton} style={buttonStyleNext} className="iconImageLarge floatTopButton avatarButtonNext profileAvatarBackNext clickableSmall" src='./images/icons/Arrow.png' alt="Next image"></img>
          </>
        :
          <></>
      }    
    
      <div className={`${zoomedDivClass}`}>
        <img className={`avatarImagePiece ${zoomedImgClass}`} style={profileImageStyle} src={selectedImagePath} alt="profile avatar image piece"/>
      </div>

    </>  
  );
}

export default ImagePiece;
