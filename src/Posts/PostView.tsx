import Container from 'react-bootstrap/esm/Container';
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
    <Container className="border rounded p-3 w-50">
      <PostUser post={post} />
      <PostContent post={post} />
      <PostStats post={post} />
      <PostButtons />
    </Container>
    );
};

export default PostView;