import { User } from '../../types';
import UserProfile from '../UserProfile/UserProfile';


interface Props {
  users: User[];
  cssId?: string;
}

const UserList = ({ users, cssId }: Props) => {
  return (
    <div className="PostList">
      {users.map((user: User) => (
        <UserProfile key={user.id} user={user} id={cssId} />
      ))}
    </div>
  );
};

export default UserList;