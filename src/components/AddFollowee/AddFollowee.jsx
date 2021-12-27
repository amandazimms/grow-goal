import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

function AddFollowee(props) {

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const [text, setText] = useState(props.text || '');

  useEffect(() => {
  }, []);

  const handleChange = (event) =>{
    setText(event.target.value);
  }

  const doneButton = () => {
    dispatch({ type: 'ADD_FOLLOWEE', payload: {followee: text, follower: user.id} });
    props.onLeaveAdd();
  }

  const cancelButton = () => {
    props.onLeaveAdd();
  }


  return (
    <>
        <h4 className="pageSubTitle">Find User:</h4>

        <input type="text" onChange={ (event) => handleChange(event) }></input>
        
        <Button onClick={doneButton} className="iconButton confirmButton">
          <img className="iconImage" src='./images/icons/GreenCheck.png' alt="Confirm new task"></img>
        </Button>

        <Button onClick={cancelButton} className="iconButton cancelButton">
          <img className="iconImage" src='./images/icons/RedEx.png' alt="Cancel new task"></img>
        </Button>

    </>
  );
}

export default AddFollowee;
