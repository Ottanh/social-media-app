import { useApolloClient } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { useStateValue, setToken, setUser } from '../../state';
import './index.css';

const NavigationBar = () => {

  const client = useApolloClient();
  const [{loggedInUser: { user }}, dispatch] = useStateValue();

  const style = ({ isActive }: { isActive: boolean }) => {
    return (
      {
        fontWeight: isActive ? 'bold' : '',
      }
    );
  };

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
        <NavLink className="NavLink" to={profile} style={isActive => style(isActive)} >
          Profile
        </NavLink>
        <NavLink className="NavLink" to="/explore" style={isActive => style(isActive)} >
          Explore
        </NavLink>
        <NavLink className="NavLink" to="/settings" style={isActive => style(isActive)} >
          Settings
        </NavLink>
        <NavLink className="NavLink" to="/" onClick={logout} style={styleLogOut()}>Log out</NavLink>
    </nav>
  );
};

export default NavigationBar;