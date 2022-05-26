import UserProfilePage from './components/UserProfilePage';
import NavigationBar from './components/NavigationBar.tsx';
import Col from 'react-bootstrap/esm/Col';
import { Navigate, Route, Routes } from 'react-router-dom';
import StartPage from './components/StartPage';
import LoginForm from './components/StartPage/LoginForm';
import { useStateValue } from './components/state';

const App = () => {
  const [{loggedInUser: { token, user }}] = useStateValue();

  return (
    <div style={{'display': 'flex'}}>
          <NavigationBar />
          <Routes>
            <Route path="*" element={token && user ? <Navigate replace to={`/${user.username}`} />: <StartPage />} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/register" element={<Col className="ExploreView col-md-5 h-100 d-flex flex-column">Register</Col>} />
            <Route path="/:userName" element={<UserProfilePage />} />
            <Route path="/explore" element={<Col className="ExploreView col-md-5 h-100 d-flex flex-column">Explore</Col>} />
            <Route path="/settings" element={<Col className="SettingsView col-md-5 h-100 d-flex flex-column">Settings</Col>} />
          </Routes>
          <div style={{'display': 'flex', 'flex': '1'}} />
    </div>
  );
};

export default App;
