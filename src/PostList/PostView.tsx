import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Post } from '../types';
import PostButtons from './PostButtons';
import PostContent from './PostContent';
import PostStats from './PostStats';
import PostUser from './PostUser';

interface Props {
  post: Post;
  user: string;
}

const PostView = ({ post, user }: Props) => {
  return (
    <>
    <Row className="PostView mx-auto p-3 border-bottom flex-grow-0">
      <Col className="">
        <PostUser user={user} />
        <PostContent post={post} />
        <PostStats post={post} />
        <PostButtons />
      </Col>
    </Row>
    </>
    );
};

export default PostView;