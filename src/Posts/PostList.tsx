import Row from 'react-bootstrap/esm/Row';
import { Post } from '../types';
import PostView from './PostView';

interface Props {
  posts: Post[]
}


const PostList = ({ posts }: Props) => {
  return (
    <Row className="d-grid gap-3">
      {posts.map(post => (
        <PostView key={post.id} post={post} />
      ))}
    </Row>
  );
};

export default PostList;