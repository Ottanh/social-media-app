import UserProfilePage from './components/UserProfilePage';
import NavigationBar from './components/NavigationBar.tsx';
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
            <Route path="/register" element={<div>Register</div>} />
            <Route path="/:userName" element={<UserProfilePage />} />
            <Route path="/explore" element={<div>Explore</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
          <div style={{'display': 'flex', 'flex': '1'}} />
    </div>
  );
};

export default App;
