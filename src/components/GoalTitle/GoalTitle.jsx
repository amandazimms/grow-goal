import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function GoalTitle(props) {

  const isNew = props.isNew;

  const dispatch = useDispatch();

  const store = useSelector(store => store);
  const selectedGoal = useSelector(store => store.selectedGoal);

  const [displayIcons, setDisplayIcons] = useState(false);
  const [editingMode, setEditingMode] = useState(isNew || false);
  const [text, setText] = useState(selectedGoal.goal_name || '');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  useEffect(() => {    
  }, [])
  
  const handleChange = (event) =>{
    setText(event.target.value);
  }

  const doneButton = () => {
    let textToSend = text;

    let allSpaces = true;
    for (let i=0; i<text.length; i++)
      if (text[i] != " ")
        allSpaces = false;

    if (text === "" || allSpaces){
      textToSend = "New Goal"
      setText(textToSend);
    }

    const goalToSend = {
      goal_name: textToSend,
      goal: selectedGoal
    }

    dispatch({type: 'UPDATE_GOAL_TITLE', payload: goalToSend });

    setEditingMode(false);
  }

  const cancelButton = () => {
    setEditingMode(false);
  }

  const editButton = () => {
    setEditingMode(true);
    setDisplayIcons(false);
  }

  const deleteButton = () => {
    //runs when first delete icon is clicked - triggers modal popup confirm 
    setShowDeleteConfirmModal(true);
  }

  const finalDeleteButton = () => {
    console.log('->about to send this goal: ', selectedGoal);
    //runs when user CONFIRMS deletion in the modal popup - delete goal for real!
    dispatch({type: 'DELETE_GOAL', payload: selectedGoal});
  }

  const handleDeleteModalClose = () => {
    setShowDeleteConfirmModal(false);
    setEditingMode(false);
  }

  return (
    <>
      {/* <p>TITLE's props: {JSON.stringify(props)}</p> */}
      {/* <p>title's SG: {JSON.stringify(selectedGoal)}</p> */}

      { editingMode 
        ? 
         <>
          <input value={text} placeholder={selectedGoal.goal_name} className="goalTitleInput" type="text" onChange={ (event) => handleChange(event) }></input>
          
          <Button onClick={doneButton} className="iconButton confirmButton">
            <img className="iconImage iconImageLarge" src='./images/icons/GreenCheck.png' alt="Confirm new task"></img>
          </Button>

          <Button onClick={cancelButton} className="iconButton cancelButton">
            <img className="iconImage iconImageLarge" src='./images/icons/RedEx.png' alt="Cancel new task"></img>
          </Button>
         </>
        : 
          <>
            <p className="goalTitleText" onClick={() => setDisplayIcons(true)}>{text}</p>
  
            { displayIcons 
              ? 
                <>
                  <Button onClick={editButton} className="iconButton editDeleteButton"> 
                    <img className="iconImage iconImageLarge" src='./images/icons/EditIcon.png' alt="Edit task"></img>
                  </Button>
                  <Button onClick={deleteButton} className="iconButton editDeleteButton">
                    <img className="iconImage iconImageLarge" src='./images/icons/TrashIcon.png' alt="Delete task"></img>
                  </Button>
                </>
              :
                <></>
            } 
          </>
        
      }

      <Modal show={showDeleteConfirmModal} onHide={handleDeleteModalClose}>
        <Modal.Header>
          <Modal.Title>Delete Goal?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this ENTIRE GOAL and all its tasks?</p>
          <p>This action cannot be undone</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteModalClose}>No, keep it</Button>
          <Link to="/goals" onClick={finalDeleteButton}>
            <Button variant="secondary">Yes, Delete it</Button>
          </Link>
        </Modal.Footer>
      </Modal>


     
    </>
  );
}

export default GoalTitle;
