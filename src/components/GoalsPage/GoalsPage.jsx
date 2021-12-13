import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function GoalsPage() {
  const goals = useSelector((store) => store.goal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( {type: 'FETCH_GOALS'} );
    console.log('goals:', goals);
    // dispatch( {type: 'FETCH_TASKS'} );
  }, []);

  const setSelectedGoal = (goal) =>{
    dispatch( {type: 'SET_SELECTED_GOAL', payload: goal});
  }

  return (
    <div className="container">
      <h3>{JSON.stringify(goals)}</h3>
      <h2>Goals Page</h2>

      <Link to="/new-goal">
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
