import Col from 'react-bootstrap/esm/Col';
import { NavLink } from 'react-router-dom';
import { User } from '../types';

const NavigationBar = ({user}: {user: User | null}) => {

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
      </div>
    </Col>
  );
};

export default NavigationBar;