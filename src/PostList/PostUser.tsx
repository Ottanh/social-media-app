import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Post } from '../types';

interface Props {
  post: Post
}

const PostUser = ({ post }: Props) => {
  return (
    <Row className="PostUser p-3">
      <Col>
        {post.user.name}
      </Col>
    </Row>
  );
};

export default PostUser;