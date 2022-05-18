import Container from 'react-bootstrap/esm/Container';
import UserProfilePage from './UserProfilePage';
import NavigationBar from './NavigationBar.tsx';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Navigate, Route, Routes } from 'react-router-dom';

const App = () => {

  const loggedInUser = 'olli111';

  return (
    <Container className="App pt-5 border border-top-0 min-vh-100">
      <Row className="min-vh-100">
        <NavigationBar />
        <Routes>
          <Route path="/" element={loggedInUser ? <Navigate replace to="/olli111" />: <Navigate replace to="/home" />} />
          <Route path="/home" element={<Col className="Home col-md-5 h-100 d-flex flex-column">TODO</Col>} />
          <Route path="/:userName" element={<UserProfilePage />} />
          <Route path="/explore" element={<Col className="ExploreView col-md-5 h-100 d-flex flex-column">TODO</Col>} />
          <Route path="/settings" element={<Col className="SettingsView col-md-5 h-100 d-flex flex-column">TODO</Col>} />
        </Routes>
        <Col className="RightPadding col-sx-1 ps-5" />
      </Row>
    </Container>
  );
};

export default App;
