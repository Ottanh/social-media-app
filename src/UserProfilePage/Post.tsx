import Container from 'react-bootstrap/esm/Container';
import { Post as PostType, User } from '../types';
import PostButtons from './PostButtons';
import PostContent from './PostContent';
import PostStats from './PostStats';
import PostUser from './PostUser';

interface Props {
  post: PostType;
  user: User;
}

const Post = ({ post, user }: Props) => {
  return (
    <Container className="border rounded p-3 w-50">
      <PostUser user={user} />
      <PostContent post={post} />
      <PostStats post={post} />
      <PostButtons />
    </Container>
    );
}

export default Post;