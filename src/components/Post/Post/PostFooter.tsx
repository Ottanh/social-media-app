import { Post } from '../../../types';
import './index.css';

interface Props {
  post: Post
}

const PostFooter = ({ post }: Props) => {
  return (
    <div className="PostFooter">
      <button className="PostButton">Reply</button>
      <button className="PostButton">Like</button>
      <div className="Likes">Likes: {post.likes}</div>
    </div>
  );
};

export default PostFooter;