import Col from 'react-bootstrap/esm/Col';
import { NavLink } from 'react-router-dom';
import { User } from '../types';

const NavigationBar = ({user, logout}: {user: User | null, logout: () => void}) => {

  const style = ({ isActive }: { isActive: boolean }) => {
    return (
      {
        display: 'inline-block',
        width: '100%',
        textDecoration: 'none',
        color: 'black',
        fontWeight: isActive ? 'bold' : '',
        fontSize: 'large'
      }
    );
  };

  const styleLogOut = () => {

    if(!user){
      return {
        display: 'none'
      };
    }

    return (
      {
        display: 'inline-block',
        width: '100%',
        textDecoration: 'none',
        color: 'black',
        fontSize: 'large'
      }
    );
  };

  const profile = user ? user.username : '';

  return (
    <Col className="NavBar " style={{'textAlign': 'center'}}>
      <div className="flex-column w-50 pt-5 pe-3" style={{'marginLeft': 'auto'}}>
        <NavLink to={profile} style={isActive => style(isActive)} >
          Profile
        </NavLink>
        <NavLink to="/explore" style={isActive => style(isActive)} >
          Explore
        </NavLink>
        <NavLink to="/settings" style={isActive => style(isActive)} >
          Settings
        </NavLink>
        <NavLink to="/" onClick={logout} style={styleLogOut()}>Log out</NavLink>
      </div>
    </Col>
  );
};

export default NavigationBar;