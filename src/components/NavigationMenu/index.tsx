import { useApolloClient } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { useStateValue, setToken, setUser } from '../../state';
import { VscAccount, VscSearch, VscSignOut } from 'react-icons/vsc';


import './index.css';

const NavigationBar = () => {
  const client = useApolloClient();
  const [{loggedInUser: { user }}, dispatch] = useStateValue();


  const styleLogOut = () => {
    if(!user){
      return {
        display: 'none'
      };
    }
  };

  const profile = user ? user.username : '';

  const logout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.clear();  
    client.resetStore();
  };

  return (
    <nav className="NavBar">
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to={profile} >
          <div className="IconContainer">
            <VscAccount className="ProfileIcon"/> Profile
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to="/explore" >
        <div className="IconContainer">
          <VscSearch className="SearchIcon"/> Explore
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to="" onClick={logout} style={styleLogOut()}>
        <div className="IconContainer">
          <VscSignOut className="LogOutIcon"/> Sign out
        </div>
        </NavLink>
    </nav>
  );
};

export default NavigationBar;