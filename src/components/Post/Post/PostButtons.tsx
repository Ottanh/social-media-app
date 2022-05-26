import Button from 'react-bootstrap/esm/Button';
import './index.css';

const PostButtons = () => {
  return (
    <div className="PostButtons">
      <Button variant="dark">Reply</Button>
      <Button variant="dark">Like</Button>
    </div>
  );
};

export default PostButtons;