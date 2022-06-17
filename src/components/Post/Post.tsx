import { Post as PostType } from '../../types';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';
import PostFooter from './PostFooter/PostFooter';
import './Post.css';

interface Props {
  post: PostType;
}

const Post = ({ post }: Props) => {
  return (
    <article className="PostView">
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostFooter post={post}/>
    </article>
  );
};

export default Post;