import { NavLink } from 'react-router-dom';
import { setState, useStateValue } from '../../state';
import catlogo from '../../images/cat-logo.png';
import './NavMenu.css';
import { BsBoxArrowUpRight, BsHouse, BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useApolloClient } from '@apollo/client';

const NavigationBar = () => {
  const [{ loggedInUser }] = useStateValue();
  const [, dispatch] = useStateValue();
  const client = useApolloClient();

  const logout = () => {
    dispatch(setState(
      {
        loggedInUser: null,
        searchResult: {
          user: [],
          post: []
        },
        newPosts: []
      }
    ));
    console.log(loggedInUser);
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
    <section className="nav-menu-container">
      <nav className="nav-menu">
        <img className="manuli-logo" src={catlogo} alt="manuliLogo"/>
        <NavLink className={({ isActive }) => isActive ? 'active-nav-ink' : 'nav-link'} to={loggedInUser ? '/home' : ''} >
          <div className="icon-container">
            <BsHouse className="home-icon" size="1.5em"/> Home
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active-nav-link' : 'nav-link'} to={loggedInUser ? loggedInUser.username : ''} style={styleHide()}>
          <div className="icon-container">
            <AiOutlineUser className="profile-icon" size="1.5em"/> Profile
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active-nav-link' : 'nav-link'} to="/explore" >
          <div className="icon-container">
            <BsSearch className="search-icon" size="1.5em" /> Explore
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active-nav-link' : 'nav-link'} to="" onClick={logout} style={styleHide()}>
          <div className="icon-container">
            <BsBoxArrowUpRight className="logout-icon" size="1.5em" /> Sign out
          </div>
        </NavLink>
      </nav>
      <a className="icon-attribution" href="https://www.flaticon.com/free-icons/cat" title="cat icons">Cat icons created by Freepik - Flaticon</a>
    </section>
  );
};

export default NavigationBar;