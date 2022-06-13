import LogRegButtons from '../../components/User/LogRegButtons/LogRegButtons';
import manuli from '../../images/manuli.jpg';
import { Outlet, Route, Routes } from 'react-router-dom';
import LoginForm from '../../components/User/LoginForm/LoginForm';
import RegisterForm from '../../components/User/RegisterForm/RegisterForm';
import './EntryPage.css';

const EntryPage = () => {
  return (
    <div className="StartPage">
        <img src={manuli} alt="manuli"/>
      <div className="PageContent">
        <Routes>
          <Route path="/" element={
            <>
              <h1 className="Title">SomeThing</h1>
              <div className="OutletContainer">
                <Outlet/>
              </div>
            </>
          }>
            <Route path="" element={<LogRegButtons />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};


export default EntryPage;