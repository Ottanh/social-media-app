import PostList from '../Posts/PostList';
import { User } from '../types';

interface Props {
  user: User
}

const UserProfilePage = ({ user }: Props) => {
  return (
    <div>
      <PostList user={user}/>
    </div>
  );
};

export default UserProfilePage;