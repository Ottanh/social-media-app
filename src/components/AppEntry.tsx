import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import NavigationMenu from '../screens/NavigationMenu';
import StartPage from '../screens/StartPage';
import { useStateValue } from '../state';






const AppEntry = () => {
  const [{loggedInUser: { token, user }}] = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  
    if(token && user) {
      if(location.pathname === '/') {
        navigate(`/${user.username}`);
      }
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
      return <StartPage />;
    }
  };


  export default AppEntry;