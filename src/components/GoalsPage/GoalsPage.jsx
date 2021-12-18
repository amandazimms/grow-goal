import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function GoalsPage() {
  const goals = useSelector((store) => store.goal);
  const dispatch = useDispatch();

  useEffect(() => {
    //todo - add payload for specific goals to this user
    dispatch( {type: 'FETCH_GOALS'} );
  }, []);

  const setSelectedGoal = (goal) =>{
    dispatch( {type: 'SET_SELECTED_GOAL', payload: goal});
  }

  const addNewGoal = () => {
    dispatch({ type: 'ADD_GOAL', payload: {
        goal_name: '',
        progress: 0,
        is_accomplished: false,
        user_id: 1,
        plant_avatar_id: 1
        //todo add userID
    }});
    //note that ADD_GOAL sequence ends with SET_SELECTED_GOAL for the new goal
  }

  return (
    <div className="container">
      <img className="plantAvatarImage" src="/images/plantAvatars/Bush8.png"></img>
      {/* <h3>{JSON.stringify(goals)}</h3> */}
      <h2>Goals Page</h2>

      <Link to="/new-goal" onClick={addNewGoal}>
        <button>Add New Goal</button>
      </Link>


      {goals.map(goal => {
        return (
          <div key={goal.id}>
            <h3>{goal.goal_name}</h3>
            
            <Link to="/goal" onClick={() => setSelectedGoal(goal)}>
              <button>
                Goal plant avatar image here
                {/* todo: image of goal's plant Avatar */}
                {/* <img src={goal.poster} alt={goal.title}/> */}
              </button>
            </Link>
          </div>
          );
      })}

    </div>
  );
}

export default GoalsPage;
