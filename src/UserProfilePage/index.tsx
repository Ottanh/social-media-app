import { Container } from 'react-bootstrap';
import PostList from '../Posts/PostList';
import { User } from '../types';
import UserDetails from './UserDetails';

interface Props {
  user: User
}

const UserProfilePage = ({ user }: Props) => {
  return (
    <Container>
      <UserDetails user={user} />
      <PostList posts={user.posts} />
    </Container>
  );
};

export default UserProfilePage;