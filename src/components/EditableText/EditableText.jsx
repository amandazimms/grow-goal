import React, { useState } from 'react';

function EditableText() {

  const [displayIcons, setDisplayIcons] = useState(false);
  const [editingMode, setEditingMode] = useState(false);

  const [text, setText] = useState('');
  const [editingText, setEditingText] = useState(text);

  const handleChange = (event) =>{
    setEditingText(event.target.value);
  }

  const doneButton = () => {
    setText(editingText);
    setEditingMode(false);
  }

  const cancelButton = () => {
    setEditingMode(false);
  }

  const setEditingTrue = () => {
    setEditingMode(true);
    setDisplayIcons(false);
    console.log('editing mode:', editingMode);
    console.log('display icons:', displayIcons);
  }

  const setDisplayIconsTrue = () => {
    setDisplayIcons(true);
    console.log('display icons:', displayIcons);
  }

  const editButton = () => {
    setEditingMode(true);

  }

  const deleteButton = () => {
    //todo delete this whole component, after prompt
  }


  return (
    <div>
      { editingMode 
        ? 
         <><input value={editingText} type="text" onChange={ (event) => handleChange(event) }></input>
         <button onClick={doneButton}>done</button>
         <button onClick={cancelButton}>cancel</button></>
        : 
          <>
          <p onClick={setDisplayIconsTrue}>text: {text}</p> 
          { displayIcons 
            ? 
              <><button onClick={editButton}>edit</button>
              <button onClick={deleteButton}>delete</button></>
            :
              <></>
          } </>
        
      }

     
    </div>
  );
}

export default EditableText;
