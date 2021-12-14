import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function AddNewText(props) {

  const dispatch = useDispatch();
  const placeholderText = props.placeholderText || '';
  const [text, setText] = useState(props.text || '');

  const handleChange = (event) =>{
    setText(event.target.value);
  }

  const doneButton = () => {
    dispatch({ type: 'ADD_TASK', payload: {
      task_name: text,
      is_complete: false,
      // todo: add actual specific goal id - props or reducer?
      goal_id: 1
    }});
    props.onLeaveAdd();
  }

  const cancelButton = () => {
    props.onLeaveAdd();
  }


  return (
    <div>
      <input placeholder={placeholderText} type="text" onChange={ (event) => handleChange(event) }></input>
      <button onClick={doneButton}>done</button>
      <button onClick={cancelButton}>cancel</button>
    </div>
  );
}

export default AddNewText;
