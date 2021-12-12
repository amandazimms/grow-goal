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

  const setDisplayIconsTrue = () => {
    setDisplayIcons(true);
  }

  const setDisplayIconsFalse = () => {
    setDisplayIcons(true);
  }

  const editButton = () => {
    setEditingMode(true);
    setDisplayIcons(false);
  }

  const deleteButton = () => {
    if (confirm("delete this task/goal?")){
      // delete this task/goal from the db, and make sure to re-render (get again)
      setText('Placeholder (This is deleted)');
      setDisplayIcons(false);
      setEditingMode(false);
    }
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
