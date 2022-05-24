import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogRegButtons = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Row className="Buttons pt-5 px-3">
      <Col align="right">
        <Button onClick={() => handleClick('/login')} variant="dark">Login</Button>
      </Col>
      <Col align="left">
        <Button onClick={() => handleClick('/register')} variant="dark">Register</Button>
      </Col>
    </Row>
  );
};


export default LogRegButtons;


