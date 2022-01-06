import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function ImagePiece(props) {

  const images = props.images;

  const editingMode = props.editMode;
  const showMyArrows = props.detailEditingMode;
  const zoomedImgClass = props.zoomedImgClass;
  const zoomedDivClass = props.zoomedDivClass;

  const dispatch = useDispatch();

  const [selectedImageIndex, setSelectedImageIndex] = useState(1);
  const [selectedImagePath, setSelectedImagePath] = useState(images[1].image_path);
  // const [selectedImagePath, setSelectedImagePath] = useState("");

  useEffect(() => {
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
    } 
    else {
      setSelectedImageIndex(selectedImageIndex-1);
      setSelectedImagePath(images[selectedImageIndex-1].image_path);
    }

  }

  const nextButton = () => {
    if (selectedImageIndex === images.length-1) {
      setSelectedImageIndex(0)
      setSelectedImagePath(images[0].image_path);
    } 
    else {
      setSelectedImageIndex(selectedImageIndex+1);
      setSelectedImagePath(images[selectedImageIndex+1].image_path);
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
            <Button onClick={backButton} style={buttonStyleBack} className="floatTopButton iconButton avatarButtonBack"> 
              <img className="iconImageLarge imageFlip" src='./images/icons/Arrow.png' alt="Next image"></img>
            </Button>

            <Button onClick={nextButton} style={buttonStyleNext} className="floatTopButton iconButton avatarButtonNext"> 
              <img className="iconImageLarge" src='./images/icons/Arrow.png' alt="Next image"></img>
            </Button>
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
