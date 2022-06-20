import { NavLink } from 'react-router-dom';
import { setUser, useStateValue } from '../../state';
import manuliLogo from '../../images/cat-logo.jpg';
import './NavMenu.css';
import { BsBoxArrowUpRight, BsHouse, BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useApolloClient } from '@apollo/client';

const NavigationBar = () => {
  const [{ loggedInUser }] = useStateValue();
  const [, dispatch] = useStateValue();
  const client = useApolloClient();

  const logout = () => {
    dispatch(setUser(null));
    localStorage.clear();  
    client.resetStore();
  };

  const styleHide = () => {
    if(!loggedInUser){
      return {
        display: 'none'
      };
    }
  };

  return (
    <nav className="NavMenu">
      <div className="LinkWrapper">
        <img className="manuliLogo" src={manuliLogo} alt="manuliLogo"/>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to={loggedInUser ? '/home' : ''} >
          <div className="IconContainer">
            <BsHouse className="HomeIcon" size="1.5em"/> Home
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to={loggedInUser ? loggedInUser.username : ''} style={styleHide()}>
          <div className="IconContainer">
            <AiOutlineUser className="ProfileIcon" size="1.5em"/> Profile
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to="/explore" >
          <div className="IconContainer">
            <BsSearch className="SearchIcon" size="1.5em" /> Explore
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to="" onClick={logout} style={styleHide()}>
          <div className="IconContainer">
            <BsBoxArrowUpRight className="LogOutIcon" size="1.5em" /> Sign out
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;