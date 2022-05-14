import PostList from './UserProfilePage/PostList';
import user from './data/user';
import Container from 'react-bootstrap/esm/Container';

const App = () => {
  return (
    <Container className="border border-top-0 p-3 vh-100">
      <PostList user={user} />
    </Container>
  );
}

export default App
