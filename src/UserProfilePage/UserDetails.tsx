import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { User } from '../types';

interface Props {
  user: User
}

const UserDetails = ({ user }: Props) => {
  return (
    <Row className="UserDetails w-50 border rounded p-3 m-auto mb-3">
      <Col>
        <Row className="p-3">
          <div className="fw-bold">
            {user.name} 
          </div>
          <div className="fw-light">
            @{user.username}
          </div>
        </Row>
        <Row className="p-3">
          <p>
            {user.description}
          </p>
          <p>
            Joined: {user.joined}
          </p>
        </Row>
      </Col>
    </Row>
  );
};

export default UserDetails;