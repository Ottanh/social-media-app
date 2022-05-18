import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Post } from '../types';

interface Props {
  post: Post
}

const PostStats = ({ post }: Props) => {
  return (
    <Row className="PostStats pt-3 px-3">
      <Col>
        {post.date}
      </Col>
      <Col>
        Likes: {post.likes}
      </Col>
    </Row>
  );
};

export default PostStats;