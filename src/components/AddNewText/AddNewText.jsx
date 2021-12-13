import React, { useState } from 'react';

function AddNewText(props) {

  const placeholderText = props.placeholderText || '';
  const [text, setText] = useState(props.text || '');

  const handleChange = (event) =>{
    setText(event.target.value);
  }

  const doneButton = () => {
    //todo save this text/add it to store/db
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
