import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function PageMessage(props) {
  const title = props.title || "";
  const message1 = props.message1 || "";
  const message2 = props.message2 || "";
  const image1 = props.image1 || "";
  const image2 = props.image2 || "";

  
  const stylez = {
    paddingRight: props.paddingRight || "",
    width: "200px"
  }

  return (
    <>
      <div className="centerFlexContainerColumn">
        <div className="idleAnimateImgParent">
          <img className="idleAnimateImg1" src={image1} style={stylez}/>
          <img className="idleAnimateImg2" src={image2} style={stylez}/>
        </div>
        <h2>{title}</h2>
        <p>{message1}</p>
        <p>{message2}</p>
      </div> 
    </>
  );
}

export default PageMessage;
