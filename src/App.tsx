import Container from 'react-bootstrap/esm/Container';
import UserProfilePage from './UserProfilePage';
import NavigationBar from './NavigationBar.tsx';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Navigate, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';
import LoginForm from './StartPage/LoginForm';
import { useStateValue } from './state';

const App = () => {
  const [{loggedInUser: { token, user }}] = useStateValue();

  return (
    <Container className="App pt-5 border border-top-0 min-vh-100">
      <Row className="min-vh-100">
        <NavigationBar />
        <Routes>
          <Route path="*" element={token && user ? <Navigate replace to={`/${user.username}`} />: <StartPage />} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<Col className="ExploreView col-md-5 h-100 d-flex flex-column">Register</Col>} />
          <Route path="/:userName" element={<UserProfilePage />} />
          <Route path="/explore" element={<Col className="ExploreView col-md-5 h-100 d-flex flex-column">Explore</Col>} />
          <Route path="/settings" element={<Col className="SettingsView col-md-5 h-100 d-flex flex-column">Settings</Col>} />
        </Routes>
        <Col className="RightPadding col-sx-1 ps-5" />
      </Row>
    </Container>
  );
};

export default App;
