import { Post } from '../types';
import PostView from './PostView';

interface Props {
  posts: Post[]
}


const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map(post => (
        <PostView key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;