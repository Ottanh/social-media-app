import Button from 'react-bootstrap/esm/Button';

const PostButtons = () => {
  return (
    <div style={{'display': 'flex'}}>
      <Button variant="dark">Reply</Button>
      <Button variant="dark">Like</Button>
    </div>
  );
};

export default PostButtons;