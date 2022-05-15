import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { User } from '../types';

interface Props {
  user: User
}

const PostUser = ({ user }: Props) => {
  return (
    <Row className="border-bottom p-3">
      <Col>
        {user.name}
      </Col>
    </Row>
  );
};

export default PostUser;