import { Route, Routes, useLocation } from 'react-router-dom';

import UserPage from './screens/UserPage';
import ExplorePage from './screens/ExplorePage';
import AppEntry from './components/AppEntry';

import './App.css';

const App = () => {
  const loc = useLocation();
  console.log(loc.pathname);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<AppEntry />}>
          <Route path=":username" element={<UserPage />} />
          <Route path="explore" element={<ExplorePage />} />
        </Route>
      </Routes>
    </div>
  );
};



export default App;
