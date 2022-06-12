import { Post } from '../../../../types';

import './PostHeader.css';

interface Props {
  post: Post
}

const PostHeader = ({ post }: Props) => {
  return (
    <div className="PostHeader">
      <span id="postUser">{post.user.name}</span> 
      <span id="postDate">{post.date}</span>
    </div>
  );
};

export default PostHeader;