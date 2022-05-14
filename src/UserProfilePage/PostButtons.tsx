import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const PostButtons = () => {
  return (
    <Row className="pt-3 px-3">
      <Col>
        <Button variant="dark">Reply</Button>
      </Col>
      <Col>
        <Button variant="dark">Like</Button>
      </Col>
    </Row>
  )
}

export default PostButtons;