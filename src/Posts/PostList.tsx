import Row from 'react-bootstrap/esm/Row';
import { Post } from '../types';
import PostView from './PostView';

interface Props {
  posts: Post[]
}


const PostList = ({ posts }: Props) => {
  return (
    <Row className="PostList border rounded m-auto flex-column flex-grow-1 w-100" >
      {posts.map((post, index) => (
        <PostView index={index} key={post.id} post={post} />
      ))}
    </Row>
  );
};

export default PostList;