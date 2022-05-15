import { Col } from 'react-bootstrap';
import PostList from '../Posts/PostList';
import { User } from '../types';
import UserDetails from './UserDetails';

interface Props {
  user: User
}

const UserProfilePage = ({ user }: Props) => {
  return (
    <Col className="UserProfilePage pt-4">
      <UserDetails user={user} />
      <PostList posts={user.posts} />
    </Col>
  );
};

export default UserProfilePage;