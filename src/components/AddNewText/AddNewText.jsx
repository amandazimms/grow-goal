import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddNewText(props) {

  const dispatch = useDispatch();

  const placeholderText = props.placeholderText || '';

  const [text, setText] = useState(props.text || '');

  const selectedGoal = useSelector(store => store.selectedGoal);

  useEffect(() => {
    console.log('-->AddNewText is about to dispatch a "fetch tasks. the selected goal is:', selectedGoal);
    dispatch({ type: 'FETCH_TASKS', payload: selectedGoal.id }); 
  }, []);

  const handleChange = (event) =>{
    setText(event.target.value);
  }

  const doneButton = () => {
    console.log('selectedGoal is:', selectedGoal);
    dispatch({ type: 'ADD_TASK', payload: {
      task_name: text,
      is_complete: false,
      // todo: add actual specific goal id - props or reducer?
      goal_id: selectedGoal.id
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
