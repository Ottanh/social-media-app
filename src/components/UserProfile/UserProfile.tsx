import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import FollowButton from '../FollowButton/FollowButton';
import './UserProfile.css';

interface Props {
  user: User;
  id?: string;
}


const UserProfile = ({ user, id }: Props) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/${user.username}`);
  };

  return (
    <div className="UserProfile" id={id} onClick={onClick}>
      <div className="UserProfileHeader">
        <div className="NameContainer">
          <div className="Name">
            {user.name} 
          </div>
          <div className="UserName">
            @{user.username}
          </div>
        </div>
        <FollowButton user={user} />
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

export default UserProfile;