import { Post } from '../../types';
import PostView from './Post';

interface Props {
  posts: Post[]
}


const PostList = ({ posts }: Props) => {
  return (
    <div style={{'display': 'flex', 'flex': '1', 'flexDirection': 'column'}}>
      {posts.map((post) => (
        <PostView key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;