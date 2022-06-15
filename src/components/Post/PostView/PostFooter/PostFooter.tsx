import { Post } from '../../../../types';
import { MouseEvent } from 'react';
import { BsChatText, BsHeart, BsHeartFill } from 'react-icons/bs';
import './PostFooter.css';
import { useNavigate } from 'react-router-dom';
import useLike from '../../../../hooks/useLike';
 
interface Props {
  post: Post
}

const PostFooter = ({ post }: Props) => {
  const [like, likedPost] = useLike(post);
  
  const handleLike = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    like();
  };

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="PostFooter" onClick={onClick}>
      <div className="Replies">
        <BsChatText className="PostIcons" size="1em" /> {post.replies.length}
      </div>
      <div className="Likes" onClick={handleLike} style={likedPost ? {'color': 'rgba(158, 31, 101, 1)'}: {}}>
        {likedPost 
          ? <><BsHeartFill className="PostIcons" size="1em" /> {post.likes}</> 
          : <><BsHeart className="PostIcons" size="1em" /> {post.likes}</>}
      </div>
    </div>
  );
};

export default PostFooter;