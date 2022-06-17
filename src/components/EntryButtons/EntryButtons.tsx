import { useNavigate } from 'react-router-dom';
import './EntryButtons.css';

const LogRegButtons = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="LogRegButtons">
        <button className="LoginButton" onClick={() => handleClick('/login')}>Login</button>
        <button className="RegisterButton" onClick={() => handleClick('/register')}>Register</button>
    </div>
  );
};


export default LogRegButtons;


