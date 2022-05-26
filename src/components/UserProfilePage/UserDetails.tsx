import { User } from '../../types';
import './index.css';

interface Props {
  user: User
}

const UserDetails = ({ user }: Props) => {
  return (
    <div className="UserDetails">
        <div>
          <div className="fw-bold">
            {user.name} 
          </div>
          <div className="fw-light">
            @{user.username}
          </div>
        </div>
        <div>
          <p>
            {user.description}
          </p>
          <p>
            Joined: {user.joined}
          </p>
        </div>
    </div>
  );
};

export default UserDetails;