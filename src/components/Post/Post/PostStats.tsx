import { Post } from '../../../types';
import './index.css';

interface Props {
  post: Post
}

const PostStats = ({ post }: Props) => {
  return (
    <div className="PostStats">
      <div>
        {post.date}
      </div>
      <div>
        Likes: {post.likes}
      </div>
    </div>
  );
};

export default PostStats;