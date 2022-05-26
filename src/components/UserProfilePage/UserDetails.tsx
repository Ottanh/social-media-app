import { User } from '../../types';

interface Props {
  user: User
}

const UserDetails = ({ user }: Props) => {
  return (
    <div style={{'border': '1px solid'}}>
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