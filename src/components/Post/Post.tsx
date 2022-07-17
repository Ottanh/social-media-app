import { Post as PostType } from '../../types';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';
import PostFooter from './PostFooter/PostFooter';
import './Post.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: PostType;
}

const Post = ({ post }: Props) => {
  const navigate = useNavigate();
  
  const onClick = () => {
    navigate(`/post/${post.id}`);
  };
  return (
    <article className="PostView" onClick={onClick}>
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostFooter post={post}/>
    </article>
  );
};

export default Post;