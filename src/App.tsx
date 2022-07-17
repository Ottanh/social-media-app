import { Route, Routes, useLocation } from 'react-router-dom';
import UserPage from './pages/UserPage/UserPage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import AppEntry from './components/AppEntry/AppEntry';
import PostPage from './pages/PostPage/PostPage';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import FollowedUsersPage from './pages/FollowedUsersPage/FollowedUsersPage';


const App = () => {
  const loc = useLocation();
  console.log(loc.pathname);

  return (
      <div className="App">
        <Routes>
          <Route path="*" element={<AppEntry />}>
            <Route path="home" element={<HomePage />} />
            <Route path=":username" element={<UserPage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="post/:id" element={<PostPage />} />
            <Route path=":username/following"  element={<FollowedUsersPage />}/>
          </Route>
        </Routes>
      </div>
  );
};



export default App;
