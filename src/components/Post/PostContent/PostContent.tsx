import { Post } from '../../../types';
import './PostContent.css';

interface Props {
  post: Post
}

const PostContent = ({ post }: Props) => {
  return (
    <div className="PostContent">
      {post.content}
      {post.image &&
      <img src={post.image} alt="post image"/>
      }
    </div>
  );
};

export default PostContent;