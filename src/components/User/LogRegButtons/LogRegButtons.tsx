import { useNavigate } from 'react-router-dom';
import './index.css';

const LogRegButtons = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="LogRegButtons">
        <button className="Buttons" onClick={() => handleClick('/login')}>Login</button>
        <button className="Buttons" onClick={() => handleClick('/register')}>Register</button>
    </div>
  );
};


export default LogRegButtons;


