import user from '../data/user';
import PostUser from './PostUser';

const Post = () => {
  const post = user.posts[0];

  return (
    <div>
      <PostUser user={user} />
      {post.content} <br/>
      {post.date}
    </div>
    );
}

export default Post;