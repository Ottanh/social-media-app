import Col from 'react-bootstrap/esm/Col';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {

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

  return (
    <Col className="NavBar " style={{'textAlign': 'center'}}>
      <div className="flex-column w-50 pt-5 pe-3" style={{'marginLeft': 'auto'}}>
        <NavLink to="/olli111" style={isActive => style(isActive)} >
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