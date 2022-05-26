import { Post } from '../../../types';
import PostButtons from './PostButtons';
import PostContent from './PostContent';
import PostStats from './PostStats';
import PostUser from './PostUser';
import './index.css';

interface Props {
  post: Post;
}

const PostView = ({ post }: Props) => {
  return (
    <div className="PostView">
      <PostUser user={post.user.name} />
      <PostContent post={post} />
      <PostStats post={post} />
      <PostButtons />
    </div>
  );
};

export default PostView;