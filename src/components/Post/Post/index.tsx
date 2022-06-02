import { Post } from '../../../types';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import './index.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: Post;
}

const PostView = ({ post }: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="PostView" onClick={onClick}>
      <PostHeader user={post.user.name} post={post}/>
      <PostContent post={post} />
      <PostFooter post={post}/>
    </div>
  );
};

export default PostView;