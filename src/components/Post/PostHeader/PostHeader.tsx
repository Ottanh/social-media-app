import { useNavigate } from 'react-router-dom';
import { Post } from '../../../types';
import './PostHeader.css';

interface Props {
  post: Post
}

const PostHeader = ({ post }: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/post/${post.id}`);
  };
  
  return (
    <div className="PostHeader" onClick={onClick}>
      <span id="postUser">{post.user.name}</span> 
      <span id="postDate">{post.date}</span>
    </div>
  );
};

export default PostHeader;