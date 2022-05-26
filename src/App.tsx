import { Navigate, Route, Routes } from 'react-router-dom';
import { useStateValue } from './state';

import StartPage from './screens/StartPage';
import LoginPage from './screens/LoginPage';
import NavigationMenu from './screens/NavigationMenu';
import UserPage from './screens/UserPage';

const App = () => {
  const [{loggedInUser: { token, user }}] = useStateValue();

  return (
    <div style={{'display': 'flex'}}>
          <NavigationMenu />
          <Routes>
            <Route path="*" element={token && user ? <Navigate replace to={`/${user.username}`} />: <StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<div>Register</div>} />
            <Route path="/:username" element={<UserPage />} />
            <Route path="/explore" element={<div>Explore</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
          <div style={{'display': 'flex', 'flex': '1'}} />
    </div>
  );
};

export default App;
