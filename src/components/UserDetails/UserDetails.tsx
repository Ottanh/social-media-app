import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import './UserDetails.css';

interface Props {
  user: User;
  id?: string;
}

const UserDetails = ({ user, id }: Props) => {

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/${user.username}`);
  };

  return (
    <div className="UserDetails" id={id} onClick={onClick}>
      <div>
        <div className="Name">
          {user.name} 
        </div>
        <div className="UserName">
          @{user.username}
        </div>
      </div>
      <div>
        <p>
          {user.description}
        </p>
        <p>
          Joined: {user.date}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;