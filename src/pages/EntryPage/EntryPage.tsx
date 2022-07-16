import manuli from '../../images/manuli.png';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import './EntryPage.css';
import { useState } from 'react';
import catlogo from '../../images/cat-logo.png';

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
      <img className="manuli-img" src={manuli} alt="manuli"/>
      <div className="PageContent">
        <span className="entrypage-header">
          <h1 className="Title">SomeThing</h1>
          <img className="manuli-logo-entry" src={catlogo} alt="manuliLogo"/>
        </span>
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