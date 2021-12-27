import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

function AddFollowee(props) {

 // const store = useSelector(store => store);
  const dispatch = useDispatch();

  const [text, setText] = useState(props.text || '');

  useEffect(() => {
  }, []);

  const handleChange = (event) =>{
    setText(event.target.value);
    console.log('text:', text);
  }

  const doneButton = () => {
    // dispatch({ type: 'ADD_GOAL', payload: {
    //     goal_name: '',
    //     progress: 0,
    //     is_accomplished: false,
    //     user_id: user.id,
    //     plant_avatar_id: 1
    //     //todo add userID
    //  }});
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
