import user from './data/user';
import Container from 'react-bootstrap/esm/Container';
import UserProfilePage from './UserProfilePage';
import NavigationBar from './NavigationBar.tsx';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import './App.css';

const App = () => {
  return (
    <Container className="App pt-5 border border-top-0 h-100">
      <Row className="h-100">
        <NavigationBar />
        <UserProfilePage user={user} />
        <Col className="RightPadding col-sx-1" />
      </Row>
    </Container>
  );
};

export default App;
