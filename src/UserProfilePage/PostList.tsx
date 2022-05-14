import Container from 'react-bootstrap/esm/Container';
import { User } from '../types';
import Post from './Post';

interface Props {
  user: User
}


const PostList = ({ user }: Props) => {
  return (
    <Container className="d-grid gap-3">
      {user.posts.map(post => (
        <Post key={post.id} post={post} user={user}/>
      ))}
    </Container>
  )
}

export default PostList;