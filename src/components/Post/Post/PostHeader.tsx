import { Post } from '../../../types';

interface Props {
  user: string
  post: Post
}

const PostHeader = ({ user, post }: Props) => {
  return (
    <div className="PostHeader">
      <span id="postUser">{user}</span> <span id="postDate">{post.date}</span>
    </div>
  );
};

export default PostHeader;