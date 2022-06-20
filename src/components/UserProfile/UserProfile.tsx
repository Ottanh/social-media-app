import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import FollowButton from '../FollowButton/FollowButton';
import './UserProfile.css';
import cat from '../../images/cat.jpg';

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
        <img className="userPic" src={cat} alt="manuliLogo"/>
        
        <FollowButton user={user} />
      </div>
      <div className="NameContainer">
          <div className="Name">
            {user.name} 
          </div>
          <div className="UserName">
            @{user.username}
          </div>
        </div>
      <div className="UserDetails">
        <p>
          {user.description}
        </p>
        <div>
          Joined: {user.date}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;