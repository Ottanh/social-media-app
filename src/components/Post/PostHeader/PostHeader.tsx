import { useNavigate } from 'react-router-dom';
import { Post } from '../../../types';
import { MouseEvent } from 'react';
import './PostHeader.css';

interface Props {
  post: Post
}

const PostHeader = ({ post }: Props) => {
  const navigate = useNavigate();

  const onClickUser = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/${post.user.username}`);
  };
  
  return (
    <div className="PostHeader">
      <span id="postUser" onClick={onClickUser}>{post.user.name}</span> 
      <span id="postDate">{new Date(post.date).toLocaleDateString()}</span>
    </div>
  );
};

export default PostHeader;