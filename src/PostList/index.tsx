import Row from 'react-bootstrap/esm/Row';
import { Post } from '../types';
import PostView from './PostView';

interface Props {
  posts: Post[],
  user: string
}


const PostList = ({ posts, user }: Props) => {
  return (
    <Row className="PostList border rounded m-auto d-flex flex-column flex-grow-1 w-100" >
      {posts.map((post) => (
        <PostView key={post.id} post={post} user={user}/>
      ))}
    </Row>
  );
};

export default PostList;