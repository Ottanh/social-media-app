import LogRegButtons from '../../components/User/LogRegButtons/LogRegButtons';
import './index.css';
import manuli from '../../images/manuli.jpg';
import { Outlet, Route, Routes } from 'react-router-dom';
import LoginForm from '../../components/User/LoginForm/LoginForm';
import RegisterForm from '../../components/User/RegisterForm/RegisterForm';


const EntryPage = () => {
  return (
    <div className="StartPage">
      <div className="ImageContainer">
        <img src={manuli} alt="manuli"/>
      </div>
      <div className="PageContent">
        <Routes>
          <Route path="/" element={
            <>
              <Outlet/>
              <div className="BottomPadding"/>
            </>
          }>
            <Route path="" element={
                <>
                  <h1 className="Title">SomeThing</h1>
                  <LogRegButtons />
                </>
              }
            />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
        </Routes>
      </div>
      <div className="Padding" />
    </div>
  );
};

export default EntryPage;