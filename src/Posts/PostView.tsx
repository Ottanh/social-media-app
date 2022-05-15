import Row from 'react-bootstrap/esm/Row';
import { Post } from '../types';
import PostButtons from './PostButtons';
import PostContent from './PostContent';
import PostStats from './PostStats';
import PostUser from './PostUser';

interface Props {
  post: Post;
}

const PostView = ({ post }: Props) => {
  return (
    <Row className="PostView w-50 border rounded p-3 m-auto mt-3">
      <PostUser post={post} />
      <PostContent post={post} />
      <PostStats post={post} />
      <PostButtons />
    </Row>
    );
};

export default PostView;