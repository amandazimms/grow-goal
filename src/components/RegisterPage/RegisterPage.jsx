import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button } from 'react-bootstrap';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="cards cardsColumn">
      <RegisterForm />

      <div className="cardArea cardFitContent">
        <center>
          <h5>Already Have an Account?</h5>
          <Button
            type="button"
            className="buttonButton"
            onClick={() => {
              history.push('/login');
            }}
          >
            Log In
          </Button>
        </center>
      </div>

    </div>
  );
}

export default RegisterPage;
