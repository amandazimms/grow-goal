import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LoginPage() {
  const history = useHistory();

  return (
      <div className="cards cardsColumn">
        <LoginForm />

        <div className="cardArea cardFitContent">
          <center>
            <h5>Don't Have an Account Yet?</h5>
            <Button
              type="button"
              className="buttonButton"
              onClick={() => {
                history.push('/registration');
              }}
            >
              Register
            </Button>
          </center>  
        </div>

      </div> 
  );
}

export default LoginPage;
