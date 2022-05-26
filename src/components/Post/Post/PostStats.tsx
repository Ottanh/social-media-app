import { Post } from '../../../types';

interface Props {
  post: Post
}

const PostStats = ({ post }: Props) => {
  return (
    <div style={{'display': 'flex'}}>
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