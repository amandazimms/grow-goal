import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function AddNewTask(props) {

  const dispatch = useDispatch();

  const placeholderText = props.placeholderText || '';

  const [text, setText] = useState(props.text || '');

  const selectedGoal = useSelector(store => store.selectedGoal);

  useEffect(() => {
    dispatch({ type: 'FETCH_TASKS', payload: selectedGoal.id }); 
  }, []);

  const handleChange = (event) =>{
    setText(event.target.value);
  }

  const doneButton = () => {
    dispatch({ type: 'ADD_TASK', payload: {
      task_name: text,
      is_complete: false,
      goal_id: selectedGoal.id
    }});
    props.onLeaveAdd();
  }

  const cancelButton = () => {
    props.onLeaveAdd();
  }


  return (
    <>
      <input placeholder={placeholderText} type="text" onChange={ (event) => handleChange(event) }></input>
      <Button onClick={doneButton}>done</Button>
      <Button onClick={cancelButton}>cancel</Button>
    </>
  );
}

export default AddNewTask;
