import { Navigate, Route, Routes } from 'react-router-dom';
import { useStateValue } from './state';

import StartPage from './screens/StartPage';
import LoginPage from './screens/LoginPage';
import NavigationMenu from './screens/NavigationMenu';
import UserPage from './screens/UserPage';

import './App.css';
import Search from './components/Search/search';

const App = () => {
  const [{loggedInUser: { token, user }}] = useStateValue();

  return (
    <div className="App">
      <NavigationMenu />
        <Routes>
          <Route path="*" element={token && user ? <Navigate replace to={`/${user.username}`} />: <StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<div className="RightPadding">Register</div>} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/explore" element={<div className="RightPadding"><Search/></div>} />
          <Route path="/settings" element={<div className="RightPadding">Settings</div>} />
        </Routes>
      <div className="RightPadding" />
    </div>
  );
};

export default App;
