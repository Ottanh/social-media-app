import user from './data/user';
import Container from 'react-bootstrap/esm/Container';
import UserProfilePage from './UserProfilePage';

const App = () => {
  return (
    <Container className="border border-top-0 p-3 vh-100">
      <UserProfilePage user={user} />
    </Container>
  );
};

export default App;
