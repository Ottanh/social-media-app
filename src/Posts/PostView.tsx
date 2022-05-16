import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Post } from '../types';
import PostButtons from './PostButtons';
import PostContent from './PostContent';
import PostStats from './PostStats';
import PostUser from './PostUser';

interface Props {
  post: Post;
  index: number;
}

const PostView = ({ post, index }: Props) => {

  const border = index !== 1 ? '' : 'border-top';
  const className = `PostView mx-auto p-3 ${border}`;

  return (
    <Row className={className}>
      <Col>
        <PostUser post={post} />
        <PostContent post={post} />
        <PostStats post={post} />
        <PostButtons />
      </Col>
    </Row>
    );
};

export default PostView;