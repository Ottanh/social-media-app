import user from '../data/user';

const Post = () => {
  const post = user.posts[0];

  return (
    <div>
      {user.name} <br/>
      {post.content} <br/>
      {post.date}
    </div>
    );
}

export default Post;