import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import NavigationMenu from '../NavMenu/NavMenu';
import EntryPage from '../../pages/EntryPage/EntryPage';
import { useStateValue } from '../../state';
import './AppEntry.css';

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
        <Outlet />
        <div className="Padding" />
      </>
    );
  } else {
    return <EntryPage />;
  }
};

export default AppEntry;