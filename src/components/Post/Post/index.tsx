import { Post } from '../../../types';
import PostButtons from './PostButtons';
import PostContent from './PostContent';
import PostStats from './PostStats';
import PostUser from './PostUser';

interface Props {
  post: Post;
}

const PostView = ({ post }: Props) => {
  return (
    <div style={{'display': 'flex', 'flex': '1', 'flexDirection': 'column', 'border': '1px solid'}}>
      <PostUser user={post.user.name} />
      <PostContent post={post} />
      <PostStats post={post} />
      <PostButtons />
    </div>
  );
};

export default PostView;