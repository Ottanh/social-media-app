import Col from 'react-bootstrap/esm/Col';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {

  const style = ({ isActive }: { isActive: boolean }) => {
    return (
      {
        display: 'inline-block',
        width: '100%',
        fontWeight: isActive ? 'bold' : ''
      }
    )
  }

  return (
    <Col className="" style={{'paddingLeft': '6rem', 'textAlign': 'center'}}>
      <div className="flex-column m-auto w-50" >
        <NavLink to="/profile" style={isActive => style(isActive)} >
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