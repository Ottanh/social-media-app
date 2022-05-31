import { Route, Routes, useLocation } from 'react-router-dom';

import LoginPage from './screens/LoginPage';
import UserPage from './screens/UserPage';

import './App.css';
import ExplorePage from './screens/ExplorePage';
import MainRouteWrapper from './components/AppEntry';


const App = () => {

  const loc = useLocation();
  console.log(loc.pathname);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<MainRouteWrapper />}>
          <Route path=":username" element={<UserPage />} />
          <Route path="explore" element={<ExplorePage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<div className="Padding">Register</div>} />
      </Routes>
    </div>
  );
};



export default App;
