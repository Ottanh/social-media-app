import { useApolloClient } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { useStateValue, setToken, setUser } from '../../state';
import manuliLogo from '../../images/cat-logo.jpg';
import './NavMenu.css';
import { BsBoxArrowUpRight, BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';

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
      <div className="LinkWrapper">
        <img className="manuliLogo" src={manuliLogo} alt="manuliLogo"/>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to={profile} >
          <div className="IconContainer">
            <AiOutlineUser className="ProfileIcon" size="1.5em"/> Profile
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to="/explore" >
          <div className="IconContainer">
            <BsSearch className="SearchIcon" size="1.5em" /> Explore
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'ActiveNavLink' : 'NavLink'} to="" onClick={logout} style={styleLogOut()}>
          <div className="IconContainer">
            <BsBoxArrowUpRight className="LogOutIcon" size="1.5em" /> Sign out
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavigationBar;