import { Post } from '../../../types';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import './index.css';

interface Props {
  post: Post;
}

const PostView = ({ post }: Props) => {
  return (
    <div className="PostView">
      <PostHeader user={post.user.name} post={post}/>
      <PostContent post={post} />
      <PostFooter post={post}/>
    </div>
  );
};

export default PostView;