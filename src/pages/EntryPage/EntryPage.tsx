import manuli from '../../images/manuli.jpg';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import './EntryPage.css';
import { useState } from 'react';

const EntryPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const login = () => {
    setMode('login');
  };

  const register = () => {
    setMode('register');
  };

  return (
    <div className="StartPage">
      <img src={manuli} alt="manuli"/>
      <div className="PageContent">
        <h1 className="Title">SomeThing</h1>
        <div className="OutletContainer">
          {mode === 'login' 
            ? <>
                <LoginForm /> 
                <a className="signUp"  onClick={register}>Sign up</a> 
              </>
            : <>
                <RegisterForm /> 
                <a className="signIn" onClick={login}>Sign in</a>
              </>}
        </div>
      </div>
    </div>
  );
};


export default EntryPage;