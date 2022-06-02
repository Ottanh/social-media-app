import { Route, Routes, useLocation } from 'react-router-dom';

import UserPage from './pages/UserPage';
import ExplorePage from './pages/ExplorePage';
import AppEntry from './components/AppEntry';

import './App.css';
import PostPage from './pages/PostPage';

const App = () => {
  const loc = useLocation();
  console.log(loc.pathname);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<AppEntry />}>
          <Route path=":username" element={<UserPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </div>
  );
};



export default App;
