import React, { useState } from 'react';

function EditableText() {

  const [isEditingMode, setIsEditingMode] = useState(false);

  const [text, setText] = useState('');
  const [editingText, setEditingText] = useState();

  const handleChange = (event) =>{
    setEditingText(event.target.value);
  }

  const doneButton = () => {
    setText(editingText);
    setIsEditingMode(false);
  }

  const cancelButton = () => {
    setIsEditingMode(false);
  }

  const setEditingTrue = () => {
    setIsEditingMode(true);
  }


  return (
    <div>
      { isEditingMode ? <>
         <input placeholder={text} type="text" onChange={ (event) => handleChange(event) }></input>
         <button onClick={doneButton}>done</button>
         <button onClick={cancelButton}>cancel</button> </>
        : <p onClick={setEditingTrue}>text: {text}</p>
      }

     
    </div>
  );
}

export default EditableText;
