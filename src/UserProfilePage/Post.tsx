import { Post as PostType, User } from '../types';
import PostButtons from './PostButtons';
import PostContent from './PostContent';
import PostStats from './PostStats';
import PostUser from './PostUser';

interface Props {
  post: PostType;
  user: User;
}

const style = {
  "padding": "5px",
  "margin": "5px",
  "border": "black",
  "border-style": "solid",
  "border-width": "1px"
}

const Post = ({ post, user }: Props) => {
  return (
    <div style={style}>
      <PostUser user={user} />
      <PostContent post={post} />
      <PostStats post={post} />
      <PostButtons />
    </div>
    );
}

export default Post;