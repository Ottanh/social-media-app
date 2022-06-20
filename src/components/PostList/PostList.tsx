import { Post } from '../../types';
import PostView from '../Post/Post';

interface Props {
  posts: Post[]
}

const PostList = ({ posts }: Props) => {
  return (
    <div className="PostList">
      {posts.map((post: Post) => (
        <PostView key={post.id} post={post}/>
      ))}
    </div>
  );
};


export default PostList;