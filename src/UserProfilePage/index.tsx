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
      <PostList user={user} />
    </Container>
  );
};

export default UserProfilePage;