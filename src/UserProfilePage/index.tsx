import Col from 'react-bootstrap/esm/Col';
import PostList from '../Posts/PostList';
import { User } from '../types';
import UserDetails from './UserDetails';

interface Props {
  user: User
}

const UserProfilePage = ({ user }: Props) => {
  return (
    <Col className="UserProfilePage h-100 d-flex flex-column col-5">
      <UserDetails user={user} />
      <PostList posts={user.posts} />
    </Col>
  );
};

export default UserProfilePage;