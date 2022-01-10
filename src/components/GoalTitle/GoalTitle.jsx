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
  
  const [goalName, setGoalName] = useState(selectedGoal.goal_name || '');
  const [editingText, setEditingText] = useState(goalName);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  useEffect(() => {    
  }, [])
  
  const handleChange = (event) =>{
    setEditingText(event.target.value);
  }

  const confirmButton = () => {
    let titleToSend = editingText;

    //check to see if the current title is only spaes
    let allSpaces = true;
    for (let i=0; i<titleToSend.length; i++)
      if (titleToSend[i] != " ")
        allSpaces = false;

    //check to see if the current title is an empty string    
    if (titleToSend === "" || allSpaces){
      titleToSend = "New Goal"
    }

    //set the goal name to the new title
    setGoalName(titleToSend);

    //send it in a dispatch
    const goalToSend = {
      goal_name: titleToSend,
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
    //runs when user CONFIRMS deletion in the modal popup - delete goal for real!
    dispatch({type: 'DELETE_GOAL', payload: selectedGoal});
  }

  const handleDeleteModalClose = () => {
    setShowDeleteConfirmModal(false);
    setEditingMode(false);
  }

  return (
    <>
      {/* <p>selectedGoal: {JSON.stringify(selectedGoal)}</p> */}
      { editingMode 
        ? 
         <>
          <input value={editingText} placeholder={selectedGoal.goal_name} className="goalTitleInput" type="text" onChange={ (event) => handleChange(event) }></input>
          
          <img onClick={confirmButton} className="iconImage iconImageLarge confirmButton clickableSmall iconNudgeHigher iconAddSideMargins" src='./images/icons/GreenCheck.png' alt="Confirm goal name"></img>
          <img onClick={cancelButton} className="iconImage iconImageLarge cancelButton clickableSmall iconNudgeHigher iconAddSideMargins" src='./images/icons/RedEx.png' alt="Cancel goal name change"></img>
         </>
        : 
          <>
          
          <div className={ displayIcons ? `inlineBlock` : `clickable inlineBlock`}>
            <p className="goalTitleText" onClick={() => setDisplayIcons(true)}>{selectedGoal.goal_name}</p>
          </div>
          { displayIcons 
            ? <>
                <img onClick={editButton} className="iconImage iconImageLarge clickableSmall iconNudgeHigher iconAddSideMargins" src='./images/icons/EditIcon.png' alt="Edit goal"></img>
                <img onClick={deleteButton} className="iconImage iconImageLarge clickableSmall iconNudgeHigher iconAddSideMargins" src='./images/icons/TrashIcon.png' alt="Delete goal"></img>
              </>
            :<></>
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
          <Button className="buttonButton" variant="primary" onClick={handleDeleteModalClose}>No, keep it</Button>
          
          <Link to="/goals" onClick={finalDeleteButton}>
            <Button variant="secondary" className="buttonButton">Yes, Delete it</Button>
          </Link>
        </Modal.Footer>
      </Modal>


     
    </>
  );
}

export default GoalTitle;
