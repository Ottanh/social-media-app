import user from './data/user';
import Container from 'react-bootstrap/esm/Container';
import UserProfilePage from './UserProfilePage';

const App = () => {
  return (
    <Container className="App border border-top-0 vh-100">
      <UserProfilePage user={user} />
    </Container>
  );
};

export default App;
