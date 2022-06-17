import { Post } from '../../../types';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';
import PostFooter from './PostFooter/PostFooter';
import './PostView.css';

interface Props {
  post: Post;
}

const PostView = ({ post }: Props) => {
  return (
    <article className="PostView">
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostFooter post={post}/>
    </article>
  );
};

export default PostView;