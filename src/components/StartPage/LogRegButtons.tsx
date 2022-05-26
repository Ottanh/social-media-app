import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogRegButtons = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{'display': 'flex', 'paddingTop': '3rem'}}>
        <Button style={{'marginRight': '0.5rem'}} onClick={() => handleClick('/login')} variant="dark">Login</Button>
        <Button style={{'marginLeft': '0.5rem'}} onClick={() => handleClick('/register')} variant="dark">Register</Button>
    </div>
  );
};


export default LogRegButtons;


