import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function ImagePiece(props) {

  const images = props.images;
  const detailEditingMode = props.detailEditingMode;
  const zoomedClassNameToPass = props.zoomedClassNameToPass;
  
  const dispatch = useDispatch();

  const [selectedImageIndex, setSelectedImageIndex] = useState(1);

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
    console.log("!");
    selectedImageIndex === 0 ?
      setSelectedImageIndex(images.length-1)
    : setSelectedImageIndex(selectedImageIndex-1);
  }

  const nextButton = () => {
    console.log("!!");
    selectedImageIndex === images.length-1 ?
      setSelectedImageIndex(0)
    : setSelectedImageIndex(selectedImageIndex+1);
  }

  return (
    <>
        {/* <p>editing?{JSON.stringify(editingMode)}</p> */}
        { detailEditingMode
          ? <>
              <Button onClick={backButton} style={buttonStyleBack} className="floatTopButton iconButton avatarButtonBack"> 
                <img className="iconImageLarge imageFlip" src='./images/icons/Arrow.png' alt="Next image"></img>
              </Button>

              <div>
                <img className={`avatarImagePiece ${zoomedClassNameToPass}`} style={profileImageStyle} src={images[selectedImageIndex]} alt="profile avatar image piece"/>
              </div>

              <Button onClick={nextButton} style={buttonStyleNext} className="floatTopButton iconButton avatarButtonNext"> 
                <img className="iconImageLarge" src='./images/icons/Arrow.png' alt="Next image"></img>
              </Button>
            </>  
          : 
            <div>
              <img className={`avatarImagePiece ${zoomedClassNameToPass}`} style={profileImageStyle} src={images[selectedImageIndex]} alt="profile avatar image piece"/>
            </div>
        }
       
    </>
  );
}

export default ImagePiece;
