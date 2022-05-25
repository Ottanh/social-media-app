import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Post } from '../../../types';

interface Props {
  post: Post
}

const PostContent = ({ post }: Props) => {
  return (
    <Row className="PostContent pt-3 px-3">
      <Col>
        {post.content}
      </Col>
    </Row>
  );
};

export default PostContent;