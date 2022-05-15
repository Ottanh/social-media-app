import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { User } from '../types';

interface Props {
  user: User
}

const UserDetails = ({ user }: Props) => {
  return (
    <Row className="UserDetails w-50 border rounded p-3 m-auto">
      <Col className="">
        <p>
          Name: {user.name} <br/>
          Username: {user.username}
        </p>
        <p>
          {user.description}
        </p>
        <p>
          Joined: {user.joined}
        </p>
      </Col>
    </Row>
  );
};

export default UserDetails;