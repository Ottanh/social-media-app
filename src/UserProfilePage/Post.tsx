import user from '../data/user';
import PostContent from './PostContent';
import PostUser from './PostUser';

const Post = () => {
  const post = user.posts[0];

  return (
    <div>
      <PostUser user={user} />
      <PostContent post={post} />
    </div>
    );
}

export default Post;