import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Textarea from 'react-expanding-textarea';
import { useStateValue } from '../../state';
import { FIND_POSTS } from '../../UserProfilePage';

import './PostForm.css';

export const CREATE_POST = gql`
  mutation createPost($content: String!, $date: String!, $likes: Int!) {
    createPost(date: $date, content: $content, likes: $likes) {
      id
    }
  }
`;

const PostForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');

  const [{loggedInUser: { user }}] = useStateValue();

  const [createPost, result] = useMutation(CREATE_POST, {
    refetchQueries: [  {query: FIND_POSTS, variables: { username: user?.username }} ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });


  useEffect(() => {
    if(result.data){
      console.log(result.data);
    }
  }, [result.data]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    if(content.length < 3) {
      setError('Post must be at least 3 charecters');
      return;
    }
    createPost({ 
      variables: { 
        content: content,  
        date: (new Date()).toISOString().split('T')[0],
        likes: 0
      } 
    });
    setContent('');
  };

  const handleChange = (event: { target: { value: string; }; }) => {
    setContent(event.target.value);
    setError(null);
  };
  

  return (
      <Row className="NewPost border rounded p-3 m-auto mb-3 w-100" >
        <Col className="p-3" align="center">
          <div className="TextAreaContainer">
            <Textarea
              className="TextArea" 
              placeholder="..."
              onChange={handleChange}
              value={content}
            />
          </div>
          <button 
            className="PostButton" 
            type="submit" 
            value="Post"
            onClick={onSubmit}
          >
            Post
          </button>
          {error && <div className="divErrPost">{error}</div>}
        </Col>
      </Row>
  );
};

export default PostForm;