import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import NavigationMenu from '../NavMenu/NavMenu';
import EntryPage from '../../pages/EntryPage/EntryPage';
import { useStateValue } from '../../state';
import './AppEntry.css';


const AppEntry = () => {
  const [{ loggedInUser }] = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(loggedInUser && location.pathname === '/') {
      navigate(`/${loggedInUser.username}`);
    }
  });
  
  if (!loggedInUser && location.pathname === '/') {
    return <EntryPage />;
  } else {
    return (
      <>
        <NavigationMenu />
        <Outlet />
        <div className="Padding" />
      </>
    );
  }
};

export default AppEntry;