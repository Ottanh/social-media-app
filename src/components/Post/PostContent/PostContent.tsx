import { useNavigate } from 'react-router-dom';
import { Post } from '../../../types';
import './PostContent.css';

interface Props {
  post: Post
}

const PostContent = ({ post }: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="PostContent" onClick={onClick}>
      {post.content}
    </div>
  );
};

export default PostContent;