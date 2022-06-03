import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import NavigationMenu from '../NavigationMenu';
import EntryPage from '../../pages/EntryPage';
import { useStateValue } from '../../state';



const AppEntry = () => {
  const [{loggedInUser: { token, user }}] = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(token && user && location.pathname === '/') {
      navigate(`/${user.username}`);
    }
  });
  
    if(token && user) {
      return (
        <>
          <NavigationMenu />
          <article className="MainContent">
            <Outlet />
          </article>
          <div className="Padding" />
        </>
      );
    } else {
      return <EntryPage />;
    }
  };


  export default AppEntry;