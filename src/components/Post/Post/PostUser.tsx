import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

interface Props {
  user: string
}

const PostUser = ({ user }: Props) => {
  return (
    <Row className="PostUser p-3">
      <Col>
        {user}
      </Col>
    </Row>
  );
};

export default PostUser;