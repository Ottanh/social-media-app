import user from './data/user';
import Container from 'react-bootstrap/esm/Container';
import UserProfilePage from './UserProfilePage';
import NavigationBar from './NavigationBar.tsx';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  const loggedIn = true;
  return (
    <Container className="App pt-5 border border-top-0 h-100">
      <Row className="h-100">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/olli1111" />} />
          <Route path="/olli1111" element={<UserProfilePage user={user} />} />
          <Route path="/explore" element={<Col className="ExploreView col-md-5 h-100 d-flex flex-column">TODO</Col>} />
          <Route path="/settings" element={<Col className="SettingsView col-md-5 h-100 d-flex flex-column">TODO</Col>} />
        </Routes>
        <Col className="RightPadding col-sx-1" />
      </Row>
    </Container>
  );
};

export default App;
