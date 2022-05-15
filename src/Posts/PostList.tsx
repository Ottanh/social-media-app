import Row from 'react-bootstrap/esm/Row';
import { User } from '../types';
import Post from './Post';

interface Props {
  user: User
}


const PostList = ({ user }: Props) => {
  return (
    <Row className="d-grid gap-3">
      {user.posts.map(post => (
        <Post key={post.id} post={post} user={user}/>
      ))}
    </Row>
  );
};

export default PostList;