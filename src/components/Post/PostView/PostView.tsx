import { Post } from '../../../types';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';
import PostFooter from './PostFooter/PostFooter';
import { useNavigate } from 'react-router-dom';

import './PostView.css';

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
      <PostHeader post={post}/>
      <PostContent post={post} />
      <PostFooter post={post}/>
    </div>
  );
};

export default PostView;